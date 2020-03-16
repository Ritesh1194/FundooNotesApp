import { Component, OnInit, OnDestroy, OnChanges, Input, Inject } from '@angular/core';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
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
  public notes: Note[] = [];
  public newNotes: Note[] = [];
  dialogRef: any;
  @Input() noteData: any;
  note: Note = new Note();
  subscription: any;
  labels: Label[];
  label: Label = new Label();
  constructor(private noteService: NoteServiceService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog, private helperService: HelperServiceService, private labelService: LabelserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
    this.getNotes();
    this.getAllListLabels();
  }

  public getNotes() {
    this.noteService.getAllNotes().subscribe(newNote => {
      this.notes = newNote;
      console.log("Notes Are ", this.notes);
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    );
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
        console.log("Label", this.labels);

        if (this.labels != undefined) {
          this.setLabels(this.labels);
        }
        console.log("Display Labels Are :", this.labels);
      },
      (error: any) => {
        console.log(error)
        this.snackBar.open('error in note display', 'ok', { duration: 3000 });
      }
    );
  }

  public labelcreate(labelName) {
    const name = labelName.innerHTML;
    if (name === '') {
      return;
    }
    const label =
    {
      name: name
    }

    this.labelService.createLabel(label).subscribe(response => {
      console.log("Label ", this.label);
      this.getAllListLabels();
      this.snackBar.open("label created", "Ok", { duration: 2000 });
    }, error => {
      this.snackBar.open("error", "error to create labels", { duration: 2000 });
    }
    )
  }
}