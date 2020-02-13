import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {

  }

  registration(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${environment.apiUrl}${environment.registerUrl}`, user, this.httpOptions);
  }

  login(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${environment.apiUrl}${environment.loginUrl}`, user, this.httpOptions);
  }

  forgotpassword(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${environment.apiUrl}${environment.forgotpasswordUrl}`, user, this.httpOptions);
  }

  resetPassword(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}${environment.resetPaswordUrl}`, user);
  }
}


