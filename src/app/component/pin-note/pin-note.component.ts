import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Note } from 'src/app/core/model/note';
import { MatDialog, MatSnackBarModule, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { FormControl } from '@angular/forms';
import { Label } from 'src/app/core/model/label';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pin-note',
  templateUrl: './pin-note.component.html',
  styleUrls: ['./pin-note.component.scss']
})
export class PinNoteComponent implements OnInit {
  [x: string]: any;

  note: Note = new Note();
  isPinned: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public notes: Note, private noteService: NoteServiceService, private snackBar: MatSnackBarModule,
    public dialog: MatDialog, private sanitizer: DomSanitizer, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
  }

  pinnedNote() {
    console.log(this.note.noteId);
    this.noteService.share.subscribe(value => this.note.noteId = value);
    this.noteService.pinNotes(this.note.noteId).subscribe(response => {
      if (this.isPinned) {
        this.isPinned = true;
        this.matSnackBar.open("Note Pinned Successfully", 'Ok', { duration: 5000 });
        // this.dialogRef.close();
      }
      else if (!this.isPinned) {
        this.isPinned = false;
        this.matSnackBar.open("Note unPinned Successfully", 'Ok', { duration: 5000 });
        // this.dialogRef.close();
      }
      console.log(response);
      // this.dialogRef.close();
    },
      (error: any) => {
        console.log("error");
      });
  }
}
