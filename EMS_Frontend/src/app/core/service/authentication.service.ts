import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  signUp(user: any): Observable<any>{
    return this.http.post('auth/signUp', user);
  }

  login(userCredentials: any): Observable<any>{
    return this.http.post('auth/login', userCredentials);
  }
}
