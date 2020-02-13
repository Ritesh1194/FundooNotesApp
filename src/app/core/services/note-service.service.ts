import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  createNote(Note: any, token: string): Observable<any> {
    return this.http.post<any>(`${environment.notesApiUrl}/${environment.notesCreateUrl}/${localStorage.token}`, Note, { headers: new HttpHeaders().set('token', token) });
  }

  getAllNotes(token: string): Observable<any> {
    return this.http.get<any>(`${environment.notesApiUrl}/${environment.getAllNotesUrl}`, { headers: new HttpHeaders().set('token', token) });
  }

  updateNote(Note: any, token: string, noteId: Number): Observable<any> {
    console.log(noteId);

    return this.http.post<any>(`${environment.notesApiUrl}/${environment.notesUpdateUrl}/${localStorage.token}`, Note, { headers: new HttpHeaders().set('token', token) })

  }

  deleteNote(token: string, id: any): Observable<any> {
    return this.http.delete<any>(`${environment.notesApiUrl}${environment.notesDeleteUrl}`, { headers: new HttpHeaders().set('token', token) })
  }

  // getTrashedNotes(token: string): Observable<any> {
  //   return this.http.get<any>(`${environment.notesApiUrl}${environment.getTrashedUrl}`, { headers: new HttpHeaders().set('token', token) })
  // }

  // getArchivedNotes(token: string): Observable<any> {
  //   return this.http.get<any>(this.API_URL + "archievednotes", { headers: new HttpHeaders().set('token', token) })
  // }

  // pinNotes(token: string, id: any): Observable<any> {

  //   return this.http.post<any>(this.API_URL + "notes/pinned/" + id, { headers: new HttpHeaders().set('token', token) })

  // }
  // unPinNotes(token: string, id: any): Observable<any> {

  //   return this.http.post<any>(this.API_URL + "notes/unpinned/" + id, { headers: new HttpHeaders().set('token', token) })
  // }

  // archieveNote(token: string, id: any): Observable<any> {
  //   return this.http.post<any>(this.API_URL + "notes/archieve/" + id, { headers: new HttpHeaders().set('token', token) })
  // }

  // unarchieveNote(token: string, id: any): Observable<any> {
  //   return this.http.post<any>(this.API_URL + "notes/unarchieve/" + id, { headers: new HttpHeaders().set('token', token) })
  // }

  trashnote(token: string, id: any): Observable<any> {
    return this.http.get<any>(`${environment.notesApiUrl}${environment.getTrashedUrl}`, { headers: new HttpHeaders().set('token', token) })
  }

  // restoreNote(token: string, id: any): Observable<any> {
  //   return this.http.post<any>(this.API_URL + "notes/restore/" + id, { headers: new HttpHeaders().set('token', token) })
  // }


}
