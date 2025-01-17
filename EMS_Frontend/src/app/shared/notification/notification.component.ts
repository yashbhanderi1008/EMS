import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  message: { type: string, message: string } | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.message$.subscribe(message => {
      this.message = message;
    });
  }
}
