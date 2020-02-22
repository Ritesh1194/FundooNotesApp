import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { Note } from 'src/app/core/model/note';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.scss']
})
export class CreatenoteComponent implements OnInit {
  [x: string]: any;
  notes: any;
  popup: boolean = false;
  constructor(private router: Router, private noteservice: NoteServiceService, private snackbar: MatSnackBar) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }
  note: Note = new Note();
  Token = localStorage.getItem('token');

  ngOnInit() {
  }


  onSubmit() {
    if (this.note.title) {
      this.noteservice.createNote(this.note.noteId, this.Token).subscribe(notes => {
        this.note = new Note();
        console.log(this.note)
        this.snackbar.open('Note Created', 'Ok', { duration: 3000 });
      },
        (error: any) => {
          console.log(error);
          this.snackbar.open(error, 'error', { duration: 3000 });
        });
    }
  }
  onPopup() {
    this.popup = true;
  }

  pinned(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    this.noteservice.pinNotes(this.note.noteId).subscribe(response => {

      console.log(response);
      this.dialogRef.close();
    },
      error => {
        console.log("error");
      })
  }
  token(newNote: any, noteId: any, token: any) {
    throw new Error("Method not implemented.");
  }
}
