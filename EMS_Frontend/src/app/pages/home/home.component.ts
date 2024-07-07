import { Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/service/notification.service';
import { RegistrationService } from 'src/app/core/service/registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private registrationService: RegistrationService, private notificationService: NotificationService){
    this.dataSource = new MatTableDataSource<any>([]);
  }

  displayedColumns: string[] = ['no', 'name', 'date'];
  dataSource: MatTableDataSource<any>;
  
  @Input() events: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedEvent: any;
  submitted = false;
  form!: FormGroup;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
  }

  showEventDetails(event: any) {
    this.selectedEvent = event;
    this.registrationService.getRegistrationsByEvent(this.selectedEvent._id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.dataSource.data = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  registerUserForEvent(event: any){
    this.registrationService.registerUser(event._id).subscribe({
      next: (res) => {
        this.notificationService.showSuccess(`User registered successfully for ${event.name}`);
      },
      error: (err) => {
        this.notificationService.showError(`You are already registered for ${event.name}`);
      }
    })
  }
}
