import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router, OutletContext } from '@angular/router';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from 'src/app/core/model/note';
import { Subscriber } from 'rxjs';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';
import { LabelserviceService } from 'src/app/core/services/labelservice.service';
import { Label } from 'src/app/core/model/label';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { LabelsComponent } from '../labels/labels.component';


@Component({
  selector: 'app-iconlist',
  templateUrl: './iconlist.component.html',
  styleUrls: ['./iconlist.component.scss']
})
export class IconlistComponent implements OnInit {
  @Input() xyz: Note;
  @Input() label: Label;
  noteId: number;
  isArchive: boolean = false;
  notes: Note = new Note();
  archiveNote: any;
  @Input() note
  @Output() eventAddNoteLabel = new EventEmitter();
  // public labels: Label[] = [];
  labels: Label = new Label();
  public newLabels: Label[] = [];
  public filter = '';
  name: string;
  constructor(private router: Router, private noteservice: NoteServiceService, private labelService: LabelserviceService,
    private snackBar: MatSnackBar, public dialog: MatDialog,
    public dialogRef: MatDialogRef<DisplayNotesComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any) { }
  Token = localStorage.getItem('token')
  ngOnInit() {
  }
  saveRemainder(reminder: any) {
    this.xyz.reminder = reminder;
    console.log(this.xyz.reminder);
    this.noteservice.reminderNotes(this.xyz.noteId, reminder).subscribe((response) => {

      this.snackBar.open('Reminder Set successfully', 'Ok', { duration: 3000 });
    },
      (error: any) => {
        this.snackBar.open(error, 'error', { duration: 3000 });
      });
  }


  onClickNoteId(noteId, isArchive) {
    this.noteservice.updateNotes(noteId);
  }

  onClickDelete() {
    // this.noteId = this.xyz.noteId
    this.noteservice.deleteNote(this.xyz.noteId).subscribe((response) => {
      this.snackBar.open("Note unpinned and trashed", 'ok', { duration: 5000 });
    },
      error => {
        this.snackBar.open("error in Note Deletion", 'ok', { duration: 5000 });
      }

    );
  }

  onClickArchive() {
    this.noteservice.archieveNotes(this.xyz.noteId).subscribe((response) => {

      this.snackBar.open("Note unpinned and Archived", "OK", { duration: 5000 });
    },
      error => {
        this.snackBar.open("error in Note thrash operation", "OK", { duration: 5000 });
      });
  }

  setColor(color) {
    console.log("Color---->", this.xyz.color, this.xyz.noteId);

    this.noteservice.addColor(this.xyz.noteId, color).subscribe(res => {

      console.log("Resssponse backk---->");

      console.log("Response after setting note color-------->", res.obj);
    });
  }

  arrayOfColors = [
    [
      { color: "rgb(255, 179, 255)", name: "pink" },
      { color: "rgb(255, 255, 128)", name: "darkGolden" },
      { color: "white", name: "white" }
    ],
    [
      { color: "slategray", name: "grey" },
      { color: "rgb(153, 221, 255)", name: "light blue" },
      { color: "rgb(200, 232, 104)", name: "yellow" }
    ],
    [
      { color: "rgb(255, 153, 0)", name: "orange" },
      { color: "rgb(97, 191, 82)", name: "green" },
      { color: " rgb(158, 136, 191)", name: "darkYellow" }
    ]
  ]

  public dailogCollaborator(note) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  public dailogLabel(name:string) {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '500px',
      data: { name: this.name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }
}