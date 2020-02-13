import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/core/model/note';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { Subscriber } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() noteData: any;
  notes: Note = new Note();
  note: any;
  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public dialogref: MatDialogRef<EditComponent>, private noteservice: NoteServiceService, private snackbar: MatSnackBar) {
    this.note = this.data.note;
  }

  ngOnInit() {
  }


  editNote(title: string, description: string, noteId: number) {
    this.notes.title = title;
    this.notes.description = description;
    this.notes.noteId = noteId;
    this.noteservice.updateNote(this.notes, localStorage.getItem('token'), this.notes.noteId).subscribe((note) => {
      console.log(note);
      this.snackbar.open('Note updated successfully', 'Ok', { duration: 3000 });
    },
      (error: any) => {
        console.log("hello" + error);
        this.snackbar.open(error.error.description, 'error', { duration: 3000 });
      });
  }
}