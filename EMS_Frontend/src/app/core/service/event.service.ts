import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any>{
    return this.http.get('events/')
  }

  getEventsByUserId(): Observable<any>{
    return this.http.get('events/user')
  }

  createEvent(eventDetails: any): Observable<any>{
    return this.http.post('events/', eventDetails)
  }

  updateEvent(eventId: string, updateData: any): Observable<any>{
    return this.http.put(`events/${eventId}`, updateData)
  }

  deleteEvent(eventId: string): Observable<any>{
    return this.http.delete(`events/${eventId}`)
  }
}
