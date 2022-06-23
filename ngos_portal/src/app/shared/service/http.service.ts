import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private endPoint: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {}

  get(url: string, options?: {}) {
    return this.http.get(this.endPoint + url, options);
  }

  post(url: string, body: {}, options?: {}) {
    console.log(this.endPoint + url);
    return this.http.post(this.endPoint + url, body, options);
  }

  put(url: string, body: {}, options?: {}) {
    console.log(this.endPoint + url);
    return this.http.post(this.endPoint + url, body, options);
  }

  delete(url: string) {
    return this.http.delete(this.endPoint + url);
  }
}
