import { Component, OnInit, Inject, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatenoteComponent } from 'src/app/component/updatenote/updatenote.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/core/model/note';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { LabelserviceService } from 'src/app/core/services/labelservice.service';
@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  @Input() childMessage: Note[];
  trashedNotes: boolean = false;
  archiveNotes: boolean = false;
  private param: any;
  pin: boolean = true;
  unpin: boolean = true;
  archiveNote: any;
  notes: any;
  pinNotes: any;
  @Output() eventAddNoteLabel = new EventEmitter();
  note: Note = new Note();
  Token = localStorage.getItem('token');
  // popup: boolean = false;
  subscription: Subscription;
  sub: Subscription;

  constructor(private noteservice: NoteServiceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DisplayNotesComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private route: ActivatedRoute, private matSnackBar: MatSnackBar, private labelService: LabelserviceService) {

    // this.subscription = noteservice.getNotes().subscribe(message => {
    //   console.log("in display notes subscrib....", message.notes);
    //   this.notes = message.notes;
    //   console.log("Others Notes:", this.notes);
    // });
  }
  ngOnInit() {
    this.sub = this.route
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


  getAllListNotes() {
    this.noteservice.getAllNotes().subscribe(
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
  setnotes() {
    console.log("Set Method Called: ");
    this.noteservice.setNotes(this.notes);
  }

  getAllTrashedNotes() {
    this.trashedNotes = true;
    this.archiveNotes = false;
    console.log("trashed Notes subscribe..");
    this.noteservice.getTrashedNotesList().subscribe(message => {
      console.log("trashed Notes subscribe..", message.notes);
      this.notes = message.notes;
      console.log("final trsah data" + this.trashedNotes);
    });
  }

  displayNotes() {
    this.trashedNotes = false;
    this.archiveNotes = false;
    console.log("Display Notes Call");
    this.subscription = this.noteservice.getNotes().subscribe(message => {
      this.notes = message.notes;
      console.log(this.notes);
    });
    this.subscription = this.noteservice.getPinNotesList().subscribe(message => {
      console.log("Display PinNotes Call");
      this.pinNotes = message.notes;
      console.log(this.pinNotes);
    });
  }

  getAllArchiveNotes() {
    this.archiveNotes = true;
    this.trashedNotes = false;
    this.noteservice.getArchiveNotesList().subscribe(message => {
      this.notes = message.notes;
      console.log(this.notes);
    });
  }

  onPin(noteId) {
    console.log("on pin called");

    this.noteservice.pinNotes(noteId).subscribe(response => {
      if (!this.pin) {
        this.matSnackBar.open('note Pinned', 'ok', { duration: 5000 });
        this.pin = true;
      }
      if (!this.unpin) {
        this.matSnackBar.open('note UnPinned', 'ok', { duration: 5000 });
        this.unpin = true;
      }
    },
      (error: any) => {
        console.log(error)
        this.matSnackBar.open('error in note pinned', 'ok', { duration: 5000 });
      }
    );
  }

  onClickDelete(noteId: number) {
    this.noteservice.deleteNote(noteId).subscribe(data => {
      this.matSnackBar.open("Note Deleted", "Ok", { duration: 3000 });
    },
      (error) => {
        this.matSnackBar.open("Error in Note Deletion", "Ok", { duration: 4000 });
      }
    );
  }

  onClickRestore(noteId: number) {
    this.noteservice.restoreNote(noteId).subscribe(data => {
      this.matSnackBar.open("Note Restored", "Ok", { duration: 3000 });
    },
      (error) => {
        this.matSnackBar.open("Error while Note Restoring", "Ok", { duration: 3000 });
      }
    );
  }
  // public onClickCheckbox(event, label, note) {
  //   event.stopPropagation();
  //   this.labelService.createLabel().subscribe(response => {
  //     console.log("adding check in database");
  //     const data = { note };
  //     this.eventAddNoteLabel.emit(data);
  //   }, (error) => console.log(error));
  // }
}