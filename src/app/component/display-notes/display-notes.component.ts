import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatenoteComponent } from 'src/app/component/updatenote/updatenote.component';
import { CreatenoteComponent } from '../createnote/createnote.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/core/model/note';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {
  [x: string]: any;
  notes: any;
  note: Note = new Note();
  Token = localStorage.getItem('token');
  popup: boolean = false;
  getAllNotes: [];
  constructor(private noteservice: NoteServiceService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<DisplayNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit() {

    // this.noteservice.subcribe(() => {
    //   this.displayNotes();
    // });

    this.noteservice.getAllNotes(localStorage.getItem('token')).subscribe((response: any) => {
      console.log(response);
      this.notes = response.obj;
    });
  }
  closeClick(newNote: any) {
    console.log(this.note.title);
    console.log(this.note.description);
    this.updateNote(newNote);
  }
  onClickNoteId(noteId) {
    this.noteservice.updateNotes(noteId);
  }

  openDialog(note: any) {
    console.log("open" + this.note);

    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      panelClass: 'custom-dialog-container',
      width: 'auto',
      data: { noteId: note.noteId, title: note.title, description: note.description }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  updateNote(newNote) {
    this.noteservice.updateNote(newNote, localStorage.getItem('token'), this.notes.noteId).subscribe(response => {
      console.log(response.obj);
      // this.dialogRef.close();
    },
      error => {
        console.log("error");
      })
  }
  token(newNote: any, noteId: any, token: any) {
    throw new Error("Method not implemented.");
  }
  getAllPinNotes() {
    this.noteservice.getAllPinnedNotes(localStorage.getItem('token')).subscribe((response: any) => {
      console.log(response);
      this.notes = response.obj;
    });
  }

  displayNotes() {
    let getNotes = this.noteservice.getAllNotes(localStorage.getItem('token'));
    let getPinnedNotes = this.noteservice.getAllPinnedNotes(localStorage.getItem('token'));

    this.notes.subscribe(
      (data) => {
        console.log("All Notes" + data.response);
        this.notes = data.list;

        console.log(" " + this.notes);
      },
      (error: any) => {
        console.log("error");
      });
    getPinnedNotes.subscribe(
      (data) => {

        this.notes = data.list;
      }
    );
  }
}