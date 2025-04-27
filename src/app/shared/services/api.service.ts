import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiConfig.baseUrl;
  private readonly authEndpoint = environment.apiConfig.auth.url;
  private readonly contactEndpoint = environment.apiConfig.contacts.url;


  constructor(
    private http: HttpClient,
    private _jwtService: JwtHelperService,
  ) {}

  login(user: LoginModel): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.authEndpoint}/signin`, user).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error('Invalid credentials.'));
        }
        return throwError(() => new Error('An error occurred while logging in.'));
      })
    );
  }

  getContacts(): Observable<any>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}${this.contactEndpoint}`,{headers})
  }

  authenticateToken(token:string){
    localStorage.setItem('token',token)
    let tokenPayload = this._jwtService.decodeToken(token);
    console.log(tokenPayload)
  }
}
