import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseFormComponent } from '../../shared-components/base-form-component/base-form.component';

@Injectable()
export class ConfirmLeaveGuard implements CanDeactivate<BaseFormComponent> {

  canDeactivate(component: BaseFormComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> {

    if (component.unsavedChanges) {
      return component.unsavedChangesConfirmationDialog();
    } else {
      return Observable.of(true);
    }
  }
}
