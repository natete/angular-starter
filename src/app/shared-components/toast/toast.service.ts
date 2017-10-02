import { Injectable } from '@angular/core';
import { Message } from 'primeng/components/common/message';
import { Subject } from 'rxjs/Subject';

type Severities = 'success' | 'info' | 'warn' | 'error';

@Injectable()
export class ToastService {
  private toastsChange: Subject<Message> = new Subject<Message>();

  toastObserver = this.toastsChange.asObservable();

  constructor() { }

  /**
   * Display a success message toast.
   * @param message The text message to show (optional).
   */
  showSuccessMessage(message?: string) {
    const messageText = message || 'Operation completed successfully';
    this.showMessage('success', 'Success', messageText);
  }

  /**
   * Display an error message toast.
   * @param message The text message to show (optional).
   */
  showErrorMessage(message?: string) {
    const messageText = message || 'An unexpected error occurred';
    this.showMessage('error', 'Error', messageText);
  }

  /**
   * Display an information message toast.
   * @param message The text message to show.
   */
  showInfoMessage(message: string) {
    this.showMessage('info', 'Info', message);
  }

  /**
   * Display a warning message toast.
   * @param message The text message to show.
   */
  showWarnMessage(message: string) {
    this.showMessage('warn', 'Warning', message);
  }

  /**
   * Manually clear all the current toast messages.
   */
  clearMessages() {
    this.toastsChange.next(null);
  }

  private showMessage(severity: Severities, summary: string, detail: string) {
    this.toastsChange.next({ severity, summary, detail });
  }

}
