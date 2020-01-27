
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private API_URL = environment.apiUrl;

  private httpOptions = {
    //headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {

  }

  registration(user: any): Observable<any> {
    console.log("USER DETAILS :" + user);
    //return this.http.post<any>(this.API_URL + 'user/registeration', user, this.httpOptions);
    return this.http.post<any>("http://localhost:9050/user/registration/", user, this.httpOptions);
  }
  login(user: any): Observable<any> {
    console.log("USER DETAILS :" + user);
    //return this.http.post<any>(this.API_URL + 'user/registeration', user, this.httpOptions);
    return this.http.post<any>("http://localhost:9050/user/login/", user, this.httpOptions);
  }
  forgotPassword(user: any): Observable<any> {
    console.log("USER DETAILS :" + user.email);
    //return this.http.post<any>(this.API_URL + 'user/registeration', user, this.httpOptions);

  return this.http.post<any>("http://localhost:9050/user/forgotpassword/",user,this.httpOptions);
  }

  resetPassword(user: any): Observable<any> {
    console.log("USER DETAILS :" + user);
    //return this.http.post<any>(this.API_URL + 'user/registeration',user, this.httpOptions);
    return this.http.put<any>("http://localhost:9050/user/update/{token}/", user, this.httpOptions);
  }
}