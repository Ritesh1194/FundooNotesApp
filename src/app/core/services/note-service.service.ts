import { Injectable, Inject, Input } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../model/note';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
import { NotExpr } from '@angular/compiler';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class NoteServiceService {
  subcribe: any;
  private subject = new Subject<Note>();

  private content = new BehaviorSubject<any>(0);
  public share = this.content.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private updateSubscription: Subscription;
  getArchiveNotes: any;

  constructor(private router: Router, private http: HttpClient) { }
  createNote(value: any, token: string): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.notesCreateUrl}`);
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.notesCreateUrl}`, value, { headers: new HttpHeaders().set('token', token) });
  }

  getAllNotes(token: string) {
    return this.http.get<any>(`${environment.notesApiUrl}/${environment.getAllNotesUrl}`, { headers: new HttpHeaders().set('token', token) });
  }

  updateNote(Note: any, token: string, noteId: Number): Observable<any> {
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.notesUpdateUrl}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) })

  }

  deleteNote(noteId: any, token: string): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.notesDeleteUrl}?noteId=${noteId}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) });
    return this.http.delete<any>(`${environment.notesApiUrl}/${environment.notesDeleteUrl}?noteId=${noteId}`, { headers: new HttpHeaders().set('token', localStorage.token) })
  }

  reminderNotes(noteId: number, token: string, Note: any) {
    console.log(`${environment.notesApiUrl}/${environment.addReminderUrl}?noteId=${noteId}`);
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.addReminderUrl}?noteId=${noteId}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) })

  }
  pinNotes(noteId: number): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.pinNotesUrl}?noteId=${noteId}`);
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.pinNotesUrl}?noteId=${noteId}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) })
  }
  getAllPinnedNotes(token: string): Observable<any> {
    return this.http.get<any>(`${environment.notesApiUrl}/${environment.getAllPinnedNotesUrl}`, { headers: new HttpHeaders().set('token', localStorage.token) })
  }

  archieveNotes(noteId: any, token: string): Observable<any> {
    return this.http.post<any>(`${environment.notesApiUrl}${environment.archiveUrl}/${noteId}`, Note, { headers: new HttpHeaders().set('token', token) })
  }
  trashNotes(token: string, id: any): Observable<any> {
    return this.http.get<any>(`${environment.notesApiUrl}${environment.getTrashedUrl}`, { headers: new HttpHeaders().set('token', token) })
  }
  addColor(noteId: Number, Note: any, token: string): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.addColorUrl}?noteId=${noteId}`);
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.addColorUrl}?noteId=${noteId}`, { headers: new HttpHeaders().set('token', localStorage.token) })
  }
  updateNotes(noteId) {
    this.content.next(noteId);
  }

  getAllArchiveNotes(token: string) {
    return this.http.get<any>(`${environment.notesApiUrl}/${environment.getAllArchiveNotesUrl}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
  getAllTrashedNotes(token: string) {
    return this.http.get<any>(`${environment.notesApiUrl}/${environment.getAllTrashedNotesUrl}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
}
