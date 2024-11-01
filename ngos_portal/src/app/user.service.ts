// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users/register'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  registerUser(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl, userDetails);
  }
}
