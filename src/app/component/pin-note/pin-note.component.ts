import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Note } from 'src/app/core/model/note';
import { MatDialog, MatSnackBarModule, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { FormControl } from '@angular/forms';
import { Label } from 'src/app/core/model/label';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { NotesService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-pin-note',
  templateUrl: './pin-note.component.html',
  styleUrls: ['./pin-note.component.scss']
})
export class PinNoteComponent implements OnInit {
  @Input() xyz: Note;
  isPinned: boolean;
  pinnotes: any;
  notes: Note[];
  subscription: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) private snackBar: MatSnackBarModule,
    public dialog: MatDialog, private matSnackBar: MatSnackBar, private noteService: NoteServiceService, private notesService: NotesService) {

  }

  ngOnInit() {
  }

  pinnedNote() {
    console.log(this.xyz.noteId);
    this.noteService.pinNotes(this.xyz.noteId).subscribe(response => {
      if (this.isPinned) {
        this.isPinned = false;
        this.matSnackBar.open("Note UnPinned Successfully", 'Ok', { duration: 5000 });

      }
      else if (!this.isPinned) {
        this.isPinned = true;
        this.matSnackBar.open("Note Pinned Successfully", 'Ok', { duration: 5000 });

      }
      console.log(response);

    },
      (error: any) => {
        console.log("error");
      });
    this.noteService.getAllPinnedNotes(localStorage.getItem('token')).subscribe((response: any) => {
      this.pinnotes = response.obj;
      console.log("Pin Notes ARe ", this.pinnotes);

    });
  }
}
