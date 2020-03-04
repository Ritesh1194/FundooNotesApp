import { Injectable, Inject, Input } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../model/note';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
import { NotExpr } from '@angular/compiler';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Label } from '../model/label';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class NoteServiceService {
  subcribe: any;
  private subject = new Subject<any>();
  private noteId;
  private content = new BehaviorSubject<number>(0);
  private pincontent = new BehaviorSubject<boolean>(false);

  public share = this.content.asObservable();
  public sharepin = this.pincontent.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private notesList = new Subject<any>();
  private pinNoteList = new Subject<any>();
  private archiveNoteList = new Subject<any>();
  private trashedNoteList = new Subject<any>();
  private _autoRefresh$ = new Subject();
  private updateSubscription: Subscription;

  getArchiveNotes: any;


  constructor(private router: Router, private http: HttpClient) { }
  createNote(value: any, token: string): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.notesCreateUrl}`);
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.notesCreateUrl}`, value, { headers: new HttpHeaders().set('token', token) });
  }
  get autoRefresh$() {
    return this._autoRefresh$;
  }
  getAllNotes() {
    console.log(`${environment.notesApiUrl}/${environment.getAllNotesUrl}`);

    return this.http.get<any>(`${environment.notesApiUrl}/${environment.getAllNotesUrl}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }

  updateNote(Note: any, token: string, noteId: Number): Observable<any> {
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.notesUpdateUrl}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) })

  }

  deleteNote(noteId: any): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.notesDeleteUrl}?noteId=${noteId}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) });
    return this.http.delete<any>(`${environment.notesApiUrl}/${environment.notesDeleteUrl}?noteId=${noteId}`, { headers: new HttpHeaders().set('token', localStorage.token) })

  }


  restoreNote(noteId: any): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.notesDeleteUrl}?noteId=${noteId}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) });
    return this.http.delete<any>(`${environment.notesApiUrl}/${environment.restoreNotesUrl}?noteId=${noteId}`, { headers: new HttpHeaders().set('token', localStorage.token) })
  }
  reminderNotes(noteId: any, reminder: any): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.addReminderUrl}?noteId=${noteId}`);
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.addReminderUrl}?noteId=${noteId}`,reminder, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
  pinNotes(noteId: any): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.pinNotesUrl}?noteId=${noteId}`);
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.pinNotesUrl}?noteId=${noteId}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) })
  }
  getAllPinnedNotes(): Observable<any> {
    return this.http.get<any>(`${environment.notesApiUrl}/${environment.getAllPinnedNotesUrl}`, { headers: new HttpHeaders().set('token', localStorage.token) })
  }

  archieveNotes(noteId: any): Observable<any> {
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.archiveUrl}?noteId=${noteId}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) })

  }
  trashNotes(noteId: any): Observable<any> {
    return this.http.post<any>(`${environment.notesApiUrl}${environment.getTrashedUrl}`, { headers: new HttpHeaders().set('token', localStorage.token) })
  }
  addColor(noteId: number, color: string): Observable<any> {
    console.log(`${environment.notesApiUrl}/${environment.addColorUrl}?color=${color}&noteId=${noteId}`);
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.addColorUrl}?color=${color}&noteId=${noteId}`, Note, { headers: new HttpHeaders().set('token', localStorage.token) })
  }
  updateNotes(noteId) {
    this.content.next(noteId);

  }

  getAllArchiveNotes() {
    return this.http.get<any>(`${environment.notesApiUrl}/${environment.getAllArchiveNotesUrl}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }
  getAllTrashedNotes() {
    return this.http.get<any>(`${environment.notesApiUrl}/${environment.getAllTrashedNotesUrl}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }

  setNotes(message: Note[]) {
    console.log("List Of Notes", message)
    this.subject.next({ notes: message });
  }

  getNotes(): Observable<any> {
    return this.subject.asObservable();
  }
  setPinNotesList(message: Note[]) {
    this.pinNoteList.next({ notes: message });
  }
  getPinNotesList(): Observable<any> {
    return this.pinNoteList.asObservable();
  }
  setTrashedNotesList(message: Note[]) {
    console.log("archiveNote Service set");
    this.trashedNoteList.next({ notes: message });
  }
  getTrashedNotesList(): Observable<any> {
    console.log("trashNote Service Get");
    return this.trashedNoteList.asObservable();
  }
  setArchiveNotesList(message: Note[]) {
    console.log("archiveNote Service set");
    this.archiveNoteList.next({ notes: message });
  }
  getArchiveNotesList(): Observable<any> {
    console.log("getArchive Service Get");
    return this.archiveNoteList.asObservable();
  }
  getNoteId() {
    return this.noteId;
  }
  updateNotePin(ispin) {
    this.pincontent.next(ispin);
  }

  createCollaborator(email: any, noteId: any) {
    return this.http.post(`${environment.notesApiUrl}/${environment.addCollaboratorUrl}?email=${email}&noteId=${noteId}`, { headers: new HttpHeaders().set('token', localStorage.token) });
  }

  // removeCollaborateUser(noteId, userId) {
  //   return this.httpUtil.removeCollaborateUser(`${environment.note_url}collaborator/` + userId + '/' + noteId);
  // }


}
