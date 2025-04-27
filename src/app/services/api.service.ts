import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiConfig.baseUrl;
  private readonly authEndpoint = environment.apiConfig.auth.url;

  constructor(private http: HttpClient) {}

  login(user: LoginModel): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.authEndpoint}/signin`, user);
  }
}
