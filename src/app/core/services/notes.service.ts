import { Injectable } from '@angular/core';
import { Note } from '../model/note';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }
  private subject = new Subject<any>();

  setNotes(message: Note[]) {
         this.subject.next({ notes: message });
  }
  
  getNotes(): Observable<any> {
      return this.subject.asObservable();
  }
}
