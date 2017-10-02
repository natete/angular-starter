import { Subject } from 'rxjs/Subject';
import { PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Filter } from '../../shared-components/base-table-component/table-filter';
import { PageableFilter } from '../../shared-components/pageable-table-component/pageable-filter';

export abstract class BaseService<T extends any> {
  protected readonly PARAM_PAGE = 'page';
  protected readonly PARAM_SIZE = 'size';
  protected readonly PARAM_SORT = 'sort';
  protected readonly PARAM_SEARCH_TERM = 'searchTerm';
  protected readonly PARAM_SEARCH_CRITERIA = 'searchCriteria';

  protected BASE_ENDPOINT;
  protected pageSubject = new Subject<PageEvent>();
  protected allSubject = new BehaviorSubject<T[]>(null);

  get all(): BehaviorSubject<T[]> { return this.allSubject; }

  get page(): Observable<PageEvent> { return this.pageSubject.asObservable(); }

  constructor(protected http: HttpClient) { }

  getAll(filter?: PageableFilter) {

    let params: HttpParams;

    if (!!filter && (filter as Filter).searchTerm) {
      params = (new HttpParams())
        .append(this.PARAM_SIZE, `${filter.size}`)
        .append(this.PARAM_PAGE, `${filter.page}`)
        .append(this.PARAM_SORT, filter.sort)
        .append(this.PARAM_SEARCH_TERM, (filter as Filter).searchTerm)
        .append(this.PARAM_SEARCH_CRITERIA, (filter as Filter).criteria || '');
    } else if (!!filter) {
      params = (new HttpParams())
        .append(this.PARAM_SIZE, `${filter.size}`)
        .append(this.PARAM_PAGE, `${filter.page}`)
        .append(this.PARAM_SORT, filter.sort);
    }

    this.http.get(this.BASE_ENDPOINT, { params })
        .subscribe(response => this.extractData(response));
  }

  get(id: number): Observable<T> {
    return this.http.get(`${this.BASE_ENDPOINT}/${id}`)
               .map(response => this.mapToEntity(response));
  }

  save(entity: T): Observable<T> {
    if (entity.id) {
      return this.http.put(`${this.BASE_ENDPOINT}/${entity.id}`, entity)
                 .map(savedEntity => this.mapToEntity(savedEntity));
    } else {
      return this.http.post(this.BASE_ENDPOINT, entity)
                 .map(savedEntity => this.mapToEntity(savedEntity));
    }
  }

  delete(id: number): Observable<T> {
    return this.http.delete(`${this.BASE_ENDPOINT}/${id}`);
  }

  protected extractData(response: any) {
    this.allSubject.next(this.mapToEntities(response.content));

    this.pageSubject.next(this.mapToPage(response));
  }

  protected abstract mapToEntities(content: any[]): T[];

  protected abstract mapToEntity(content: any): T;

  private mapToPage(response: any): PageEvent {
    return {
      pageSize: response.size,
      pageIndex: response.number,
      length: response.totalElements
    };
  }
}
