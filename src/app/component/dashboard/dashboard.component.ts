import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { Note } from 'src/app/core/model/note';
import { NotesComponent } from '../notes/notes.component';
import { NotesService } from 'src/app/core/services/notes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  notes: Note[];
  AllArchiveNotes: any;
  archiveNote: any;
  trashNote: any;
  noteList: Note[];
  @Input() note: Note;
  AllTrashedNotes: any;
  constructor(private noteService: NoteServiceService, private notesService: NotesService, private router: Router) {
    this.getAllListNotes();
    this.trashNotes();
    this.archiveNotes();
  }


  ngOnInit() {
  }
  getAllListNotes() {

    this.noteService.getAllNotes(localStorage.getItem('token')).subscribe(
      (data) => {
        console.log("_________________________-", data.obj);
        this.notes = data.obj;
        if (this.notes != undefined) {
          this.setnotes();
        }
      },
      (error: any) => {
        console.log("error");
      });

  }
  archiveNotes() {
    this.noteService.getAllArchiveNotes(localStorage.getItem('token')).subscribe(
      (data) => {
        this.AllArchiveNotes = data.obj;
        console.log("All Archive Notes Are ", this.AllArchiveNotes);
      }
    );
  }
  trashNotes() {
    this.noteService.getAllTrashedNotes(localStorage.getItem('token')).subscribe(
      (data) => {
        this.AllTrashedNotes = data.obj;
        console.log("Trashed Note Are ", this.AllTrashedNotes);
      }
    );
  }
  setnotes() {
    console.log("Set Method Called: ");
    this.notesService.setNotes(this.notes);
  }
}