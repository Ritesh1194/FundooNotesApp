import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HelperServiceService } from 'src/app/core/services/helper-service.service';
import { Note } from 'src/app/core/model/note';
import { Label } from 'src/app/core/model/label';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { LabelserviceService } from 'src/app/core/services/labelservice.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  public grid = false;
  public notes: Note[] = [];
  public newNotes: Note[] = [];
  name: string;
  lables: Label = new Label();
  dialogRef: any;
  @Input() xyz: Label;
  constructor(private noteService: NoteServiceService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog, private helperService: HelperServiceService, private labelService: LabelserviceService) { }

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   this.label = params['labelName'];
    //   this.helperService.getTheme().subscribe((resp) =>
    //     this.grid = resp
    //   );
    //   this.getNotes();
    // });
  }

  // public onUpdateNote(data) {
  //   this.updateMethod(data.note);
  // }

  // updateMethod(note) {
  //   this.noteService.updateNote(note, note.noteId).subscribe(response => {
  //     this.getNotes();
  //   },
  //     error => {
  //       console.log("error");
  //     })
  // }

  // public getNotes() {
  //   this.noteService.retrieveNotes().subscribe(newNote => {
  //     this.notes = newNote;
  //     this.filterLabel(this.notes);
  //   }, error => {
  //     this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
  //   }
  //   )
  // }

  // public filterLabel(notes) {
  //   this.newNotes.length = 0;
  //   notes.filter((note) => note.labels.filter((label) => {
  //     if (this.label === label.labelName && !note.inTrash) {
  //       this.newNotes.push(note);
  //     }
  //   }))
  // }




  // heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  // addHero(newHero: string) {
  //   if (newHero) {
  //     this.heroes.push(newHero);
  //   }
  // }
  createLabel(name: string) {
    this.labelService.createLabel(this.lables.name, localStorage.getItem('token')).subscribe(resp => {
      // this.dialogRef.close();
      this.snackBar.open("Label Is Created ", "ok", { duration: 2000 })
    }
    );
    error => {
      this.snackBar.open("Label IS Not Created", "error", { duration: 2000 });
    }
  }
}
