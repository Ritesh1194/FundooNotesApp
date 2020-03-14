import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { Note } from 'src/app/core/model/note';
import { NotesComponent } from '../notes/notes.component';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Label } from 'src/app/core/model/label';
import { LabelserviceService } from 'src/app/core/services/labelservice.service';
import { Subscription } from 'rxjs';
// import 'rxjs/add/operator/filter';
export let browserRefresh = false;
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
  page: any;
  private noteId: number;
  pinNotes: Note[];
  trashNotes: Note[];
  @Output() eventAddNoteLabel = new EventEmitter();
  // public labels: Label[] = [];
  labels: Label[];
  label: Label[];
  archiveNotes: Note[];
  getAllNotes: [];

  private sub: any;
  private param: any;
  dialogRef: any;
  subscription: Subscription;

  constructor(private noteService: NoteServiceService, private labelService: LabelserviceService, private router: Router, private route: ActivatedRoute, private matSnackBar: MatSnackBar) {
    // this.getAllListNotes();
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
  });
    this.subscription = labelService.getLabels().subscribe(message => {
      console.log("in display Label subscrib....", message.label);
      this.label = message.label;
      console.log("Others Label:", this.label);
    });
    this.displayNotes();
    this.getAllTrashedNotes();
    this.getAllArchiveNotes();
    this.getAllListLabels();
    
  }

  ngOnInit() {
    console.log(" Notes ngOnInit()");
    this.route
      .queryParams
      .subscribe(params => {
        this.param = params['page'] || '';
        if (this.param == "archive") {
          console.log("elseif archive");
          this.getAllArchiveNotes();
        }
        else if (this.param == "trash") {
          console.log("elseif trash");
          this.getAllTrashedNotes();
        }
        else {
          console.log("else display");
          this.displayNotes();
        }
      });
  }
  getAllListNotes() {
    this.noteService.getAllNotes().subscribe(
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


  getAllTrashedNotes() {
    console.log("Trashed note Method Called");
    this.noteService.getAllTrashedNotes().subscribe((data) => {
      this.trashNotes = data.obj;
      if (this.trashNotes != undefined) {
        this.setTrasheNotes();
      }
      if (data.response == 'No Trashed Notes Available0') {
        console.log("Empty Trashed Display");
      }
    },
      (error) => {
        this.matSnackBar.open("Error in Dipslay Trashed Notes", 'ok', { duration: 3000 });
      });
  }
  public logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

  displayNotes() {
    let note = this.noteService.getAllNotes();
    let pinnednote = this.noteService.getAllPinnedNotes();
    note.subscribe(
      (data) => {
        this.notes = data.obj;
        if (this.notes != undefined) {
          this.setnotes();
        }
        console.log("Display Notes Are :", this.notes);
      },
      (error: any) => {
        console.log(error)
        this.matSnackBar.open('error in note display', 'ok', { duration: 3000 });
      }
    );
    pinnednote.subscribe(
      (data) => {
        this.pinNotes = data.obj;
        if (this.notes != undefined) {
          this.setPinNotes();
        }
      });
  }
  getAllArchiveNotes() {
    console.log("get all achive");
    this.noteService.getAllArchiveNotes().subscribe(
      (data) => {
        this.archiveNotes = data.obj;
        console.log(this.archiveNotes);
        if (this.archiveNotes != undefined) {
          this.setArchiveNotes();
        }
      },
      (error: any) => {
        this.matSnackBar.open("Error in Dipslay archive Notes", 'ok', { duration: 3000 });
      }
    );
  }
  setnotes() {
    console.log("Set Method Called: ");
    this.noteService.setNotes(this.notes);
  }
  setPinNotes() {
    console.log("setPinNotes");
    this.noteService.setPinNotesList(this.pinNotes);
  }
  setArchiveNotes() {
    console.log("setArchiveNotes");
    this.noteService.setArchiveNotesList(this.archiveNotes);
  }
  setTrasheNotes() {
    console.log("setTrashNotes");
    this.noteService.setTrashedNotesList(this.trashNotes);
  }

  setLabels(message: Label[]) {
    console.log("List Of Lables", message)
    this.labelService.getLabels();
  }
  getAllListLabels() {
    let lab = this.labelService.getAllLabel();
    lab.subscribe(
      (data) => {
        this.labels = data.obj;
        console.log("Label", this.label);

        if (this.labels != undefined) {
          this.setLabels(this.labels);
        }
        console.log("Display Labels Are :", this.label);
      },
      (error: any) => {
        console.log(error)
        this.matSnackBar.open('error in note display', 'ok', { duration: 3000 });
      }
    );
  }
}