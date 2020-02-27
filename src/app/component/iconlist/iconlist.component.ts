import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, OutletContext } from '@angular/router';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from 'src/app/core/model/note';
import { Subscriber } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';


@Component({
  selector: 'app-iconlist',
  templateUrl: './iconlist.component.html',
  styleUrls: ['./iconlist.component.scss']
})
export class IconlistComponent implements OnInit {
  @Input() xyz: Note;
  notes: Note = new Note();

  dialogRef: any;
  AllArchiveNotes: any;
  constructor(private router: Router, private noteservice: NoteServiceService, private snackbar: MatSnackBar) { }
  Token = localStorage.getItem('token')
  ngOnInit() {
  }

  deleteNote() {
    console.log("noteId--->" + this.xyz.noteId);
    this.noteservice.deleteNote(this.xyz.noteId, localStorage.getItem('token')).subscribe(response => {
      this.snackbar.open('Note deleted successfully', 'Ok', { duration: 3000 });

    },
      (error: any) => {
        this.snackbar.open(error, 'error', { duration: 3000 });
      });
  }

  saveRemainder(selectedMoment: any) {
    this.xyz.remainder = selectedMoment;

    console.log(this.xyz.noteId);
    this.noteservice.reminderNotes(this.xyz.noteId, localStorage.Token, this.xyz.remainder).subscribe((response) => {
      this.snackbar.open('Reminder Set successfully', 'Ok', { duration: 3000 });
    },
      (error: any) => {
        this.snackbar.open(error, 'error', { duration: 3000 });
      });
  }

  changeColor() {
    this.noteservice.addColor(this.xyz.noteId, this.xyz.color, localStorage.getItem('token')).subscribe((note) => {
      this.snackbar.open('Color Updated successfully', 'Ok', { duration: 3000 });

    },
      (error: any) => {
        this.snackbar.open(error, 'error', { duration: 3000 });
      });
  }

  onClickNoteId(noteId, isArchive) {
    this.noteservice.updateNotes(noteId);
  }

  archiveNotes() {
    this.noteservice.archieveNotes(this.notes.noteId, localStorage.getItem('token')).subscribe(
      (data) => {
        console.log(data.obj);
        this.AllArchiveNotes = data.obj;
      }
    );
  }
}