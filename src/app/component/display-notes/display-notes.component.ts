import { Component, OnInit, Inject, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatenoteComponent } from 'src/app/component/updatenote/updatenote.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/core/model/note';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotesService } from 'src/app/core/services/notes.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',

  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {
  @Input() childMessage: Note[];

  [x: string]: any;
  notes: any;
  pinnotes: any;
  note: Note = new Note();
  Token = localStorage.getItem('token');
  popup: boolean = false;
  getAllNotes: [];
  subscription: Subscription;
  constructor(private noteservice: NoteServiceService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<DisplayNotesComponent>, private notesService: NotesService,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {

    this.subscription = notesService.getNotes().subscribe(message => {
      console.log("in display notes subscrib....", message.notes);
      this.notes = message.notes;
      console.log("Others Notes:", this.notes);
    });
  }

  ngOnInit() {
    this.getAllPinNotes();
  }
  closeClick(newNote: any) {
    console.log(this.note.title);
    console.log(this.note.description);
    this.updateNote(newNote);
  }
  onClickNoteId(noteId, isPin) {
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
      this.pinnotes = response.obj;
      console.log("Pinned Notes:", this.pinnotes );
    });
  }
}