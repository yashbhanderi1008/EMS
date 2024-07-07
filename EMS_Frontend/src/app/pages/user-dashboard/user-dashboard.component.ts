import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/service/event.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  constructor(private eventService: EventService){}

  events = [];
  currentComponent: string = 'home';

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res) => {
        this.events = res.data
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  showComponent(component: string) {
    this.currentComponent = component;
  }
}
