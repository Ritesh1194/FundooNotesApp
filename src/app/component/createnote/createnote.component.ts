import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { Note } from 'src/app/core/model/note';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.scss']
})
export class CreatenoteComponent implements OnInit {
  popup: boolean = false;
  constructor(private router: Router, private noteservice: NoteServiceService, private snackbar: MatSnackBar) { }
  note: Note = new Note();
  Token = localStorage.getItem('token');

  ngOnInit() {
  }

  onSubmit() {
    if (this.note.title) {
      this.noteservice.createNote(this.note, this.Token).subscribe(notes => {
        this.note = new Note();
        console.log(this.note)
        this.snackbar.open('Note Created', 'Ok', { duration: 3000 });
      },
        (error: any) => {
          console.log(error);
          this.snackbar.open(error.error.description, 'error', { duration: 3000 });
        });
    }
  }
  onPopup() {
    this.popup = true;
  }
}
