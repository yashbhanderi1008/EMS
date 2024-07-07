import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/core/service/event.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent {
  displayedColumns: string[] = ['no', 'name', 'date', 'location', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('btnClose') btnClose!: ElementRef

  submitted = false;
  eventSubmitted = false;
  form!: FormGroup;
  eventForm!: FormGroup;
  selectedEvent: any;
  isEditMode = false;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private notificationService: NotificationService) {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  ngOnInit(): void {
    this.loadEventsByUserId();
    this.initEventForm();
  }

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

  initEventForm() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required]
    })
  }

  get eventf(): { [key: string]: AbstractControl } {
    return this.eventForm.controls;
  }

  onEventSubmit() {
    this.eventSubmitted = true;

    if (this.eventForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.eventService.updateEvent(this.selectedEvent._id, this.eventForm.value).subscribe({
        next: (res) => {
          this.notificationService.showSuccess(res.message);
          this.isEditMode = false;
        },
        error: (err) => {
          this.notificationService.showError(err.message);
        }
      });
    } else {
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: (res) => {
          this.notificationService.showSuccess(res.message);
        },
        error: (err) => {
          this.notificationService.showError(err.message);
        }
      })
    }

    this.loadEventsByUserId();
    this.eventSubmitted = false;
    this.eventForm.reset();
    this.btnClose.nativeElement.click();
  }

  loadEventsByUserId() {
    this.eventService.getEventsByUserId().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onEditEvent(row: any) {
    this.eventForm.patchValue({
      name: row.name,
      description: row.description,
      date: new Date(row.date),
      location: row.location
    });

    this.isEditMode = true;
    this.selectedEvent = row;
  }

  onDeleteEvent(rowData: any) {
    const confirmed = confirm(`Are you sure you want to delete "${rowData.name}" event?`);
    if (confirmed) {
      this.eventService.deleteEvent(rowData._id).subscribe({
        next: (res) => {
          this.notificationService.showSuccess(res.message);
          this.loadEventsByUserId();
        },
        error: (err) => {
          this.notificationService.showError(err.message);
        }
      });
    }
  }
}
