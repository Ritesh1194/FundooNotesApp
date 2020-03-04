import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Label } from '../model/label';

@Injectable({
  providedIn: 'root'
})
export class LabelserviceService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private router: Router, private http: HttpClient) { }
  createLabel(name: any) {
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.createLabelUrl}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
  createAndMapLabel(name: any, noteId: any) {
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.createAndMapUrl}?noteId=${noteId}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
  addLabelToNote(labelId: any,noteId: any) {
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.addLabelUrl}?labelId=${labelId}&noteId=${noteId}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
}
