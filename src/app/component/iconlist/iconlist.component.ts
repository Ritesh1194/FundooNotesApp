import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from 'src/app/core/model/note';
import { Subscriber } from 'rxjs';
@Component({
  selector: 'app-iconlist',
  templateUrl: './iconlist.component.html',
  styleUrls: ['./iconlist.component.scss']
})
export class IconlistComponent implements OnInit {
  @Input() noteData: any;
  notes: Note = new Note();
  note: any;
  dialogRef: any;

  constructor(private router: Router, private noteservice: NoteServiceService, private snackbar: MatSnackBar) { }
  Token = localStorage.getItem('token')
  ngOnInit() {
  }


  getNoteId(items: any) {
    this.notes.noteId = items.noteId;
  }
  delete() {
    this.noteservice.deleteNote(this.Token, this.notes.noteId).subscribe((note) => {
      this.snackbar.open('Note deleted successfully', 'Ok', { duration: 3000 });

    },
      (error: any) => {
        console.log("hello" + error);
        this.snackbar.open(error.error.description, 'error', { duration: 3000 });
      });

  }
  saveRemainder(selectedMoment: any, notes) {
    notes.remainder = selectedMoment;
    this.SetRemainder();
  }
  SetRemainder() {
    console.log(this.notes.noteId);
    this.noteservice.reminderNotes(this.notes.noteId, this.Token, this.notes.remainder).subscribe((notes) => {
      this.snackbar.open('Reminder Set successfully', 'Ok', { duration: 3000 });
    },
      (error: any) => {
        console.log(error);
        this.snackbar.open(error.error, 'error', { duration: 3000 });
      });
  }

  // updateArchiveNote(key, note) {
  //   note.isArchieve = key === 'isArchieve' ? 1 : 0;
  //   note.isArchieve = 0;
  //   this.updateArchive();
  // }
  // updateArchive() {
  //   this.noteservice.archieveNote(localStorage.getItem('token'), this.notes.noteId
  //   ).subscribe(response => {
  //     console.log(response);
  //     this.dialogRef.close();
  //   },
  //     error => {
  //       console.log("error");
  //     })
  // }
  // token(newNote: any, noteId: any, token: any) {
  //   throw new Error("Method not implemented.");
  // }

  changeColor() {
    this.noteservice.addColor(this.notes.noteId, this.notes.color, localStorage.getItem('token')).subscribe((note) => {
      this.snackbar.open('Color Updated successfully', 'Ok', { duration: 3000 });

    },
      (error: any) => {
        console.log("hello" + error);
        this.snackbar.open(error.error, 'error', { duration: 3000 });
      });
  }
}