import { Injectable, Inject, Input } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../model/note';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class NoteServiceService {
  subcribe: any;
  private subject = new Subject<Note>();
  private keepAfterRouteChange = false;

  private noteId;
  private content = new BehaviorSubject<number>(0);
  public share = this.content.asObservable();
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private updateSubscription: Subscription;

  constructor(private router: Router, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public note: Note) {
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     if (this.keepAfterRouteChange) {
    //       this.keepAfterRouteChange = false;

    //     } else {
    //       this.clear();
    //     }
    //   }
    // })
  }
  // clear(remainder?: string) {
  //   this.subject.next(new Note({ remainder }));
  // }
  // alertNote(remainder: Note) {
  //   this.keepAfterRouteChange = remainder.keepAfterRouteChange;
  //   this.subject.next(remainder);
  // }

  createNote(Note: any, token: string): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.notesCreateUrl}`, Note, { headers: new HttpHeaders().set('token', token) });
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.notesCreateUrl}`, Note, { headers: new HttpHeaders().set('token', token) });
  }

  getAllNotes(token: string): Observable<any> {
    return this.http.get<any>(`${environment.notesApiUrl}/${environment.getAllNotesUrl}`, { headers: new HttpHeaders().set('token', token) });
  }

  updateNote(Note: any, token: string, noteId: Number): Observable<any> {
    console.log(noteId);

    return this.http.post<any>(`${environment.notesApiUrl}/${environment.notesUpdateUrl}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) })

  }

  deleteNote(token: string, id: any): Observable<any> {
    return this.http.delete<any>(`${environment.notesApiUrl}${environment.notesDeleteUrl}`, { headers: new HttpHeaders().set('token', token) })
  }

  reminderNotes(noteId: number, token: string, Note: any) {
    return this.http.post<any>(`${environment.notesApiUrl}${environment.addReminderUrl}?noteId=${noteId}`, Note, { headers: new HttpHeaders().set('token', token) })

  }
  pinNotes(noteId: number): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.pinNotesUrl}?noteId=${noteId}`);
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.pinNotesUrl}?noteId=${noteId}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) })
  }
  getAllPinnedNotes(token: string): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.pinNotesUrl}`);
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.getAllPinnedNotesUrl}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) })
  }

  archieveNote(token: string, id: any): Observable<any> {
    return this.http.post<any>(`${environment.notesApiUrl}${environment.archiveUrl}/${localStorage.token}`, { headers: new HttpHeaders().set('token', token) })
  }

  trashnote(token: string, id: any): Observable<any> {
    return this.http.get<any>(`${environment.notesApiUrl}${environment.getTrashedUrl}`, { headers: new HttpHeaders().set('token', token) })
  }
  addColor(noteId: Number, Note: any, token: string): Observable<any> {
    return this.http.post<any>(`${environment.notesApiUrl}${environment.addColorUrl}/${localStorage.getItem('token')}`, { headers: new HttpHeaders().set('token', localStorage.token) })
  }
  updateNotes(noteId) {
    this.content.next(noteId);
  }
}
