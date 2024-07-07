import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private messageSubject = new BehaviorSubject<{ type: string, message: string } | null>(null);
  message$ = this.messageSubject.asObservable();

  showSuccess(message: string) {
    this.messageSubject.next({ type: 'success', message });
    this.clearMessage();
  }

  showError(message: string) {
    this.messageSubject.next({ type: 'error', message });
    this.clearMessage();
  }

  private clearMessage() {
    setTimeout(() => {
      this.messageSubject.next(null);
    }, 5000);
  }
}
