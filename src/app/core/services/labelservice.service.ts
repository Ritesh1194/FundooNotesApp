import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Label } from '../model/label';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelserviceService {
  private subject = new Subject<any>();
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  };

  constructor(private router: Router, private http: HttpClient) { }
  setLabels(message: Label[]) {
    console.log("List Of Lables", message)
    this.subject.next({ label: message });
  }

  getLabels(): Observable<any> {
    return this.subject.asObservable();
  }
  createLabel(name: any): Observable<any> {
    console.log(`${environment.labelApiUrl}/${environment.createLabelUrl}`, name);
    return this.http.post<any>(`${environment.labelApiUrl}/${environment.createLabelUrl}`, name, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
  createAndMapLabel(name: any, noteId: any): Observable<any> {
    return this.http.post<any>(`${environment.labelApiUrl}/${environment.createAndMapUrl}?noteId=${noteId}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
  addLabelToNote(labelId: any, noteId: any): Observable<any> {
    return this.http.post<any>(`${environment.labelApiUrl}/${environment.addLabelUrl}?labelId=${labelId}&noteId=${noteId}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
  getAllLabel() {
    return this.http.get<any>(`${environment.labelApiUrl}/${environment.getAllLabelUrl}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
}
