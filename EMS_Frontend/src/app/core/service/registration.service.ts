import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerUser(eventId: string): Observable<any>{
    return this.http.post(`registrations/${eventId}`, {})
  }

  getRegistrationsByEvent(eventId: string): Observable<any>{
    return this.http.get(`registrations/event/${eventId}`)
  }
}
