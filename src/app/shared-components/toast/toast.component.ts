import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ToastService } from './toast.service';
import { Subscription } from 'rxjs/Subscription';
import { Message } from 'primeng/components/common/message';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
@AutoUnsubscribe()
export class ToastComponent implements OnInit {

  private toastSubscription: Subscription;

  messages: Message[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toastSubscription = this.toastService.toastObserver.subscribe(
      (notification) => {
        if (!!notification) {
          // This is a workaround for a bug in the lib, otherwise the message never disappears
          // automatically
          this.messages = [];
          this.messages.push(notification);
        } else {
          this.messages = [];
        }
      });
  }

}
