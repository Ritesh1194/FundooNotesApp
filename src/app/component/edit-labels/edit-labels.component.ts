import { Component, OnInit, Input, Inject } from '@angular/core';
import { Note } from 'src/app/core/model/note';
import { Label } from 'src/app/core/model/label';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HelperServiceService } from 'src/app/core/services/helper-service.service';
import { LabelserviceService } from 'src/app/core/services/labelservice.service';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.css']
})
export class EditLabelsComponent implements OnInit {
  public notes: Note[] = [];
  public labels: Label[] = [];
  note: Note = new Note();
  constructor(public dialogRef: MatDialogRef<EditLabelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private noteService: NoteServiceService, private labelService: LabelserviceService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getLabels();
  }


  public getLabels() {
    this.labelService.getAllLabel().subscribe(newLabel => {
      this.labels = newLabel;
    }
    )
  }

  public closeDailog() {
    this.dialogRef.close();
  }

  public labelUpdate(label, labelName) {
    const name = labelName.innerHTML;
    if (name === '') {
      return;
    }
    console.log(name);
    const newLabel =
    {
      ...label,
      labelName: name
    }
    this.labelService.updateLabel(newLabel.labelId).subscribe(response => {
      this.getLabels();
      this.snackBar.open("label updated", "Ok", { duration: 2000 });
    }, error => {
      this.snackBar.open("error", "error to update labels", { duration: 2000 });
    }
    )
  }

  public labeldelete(label) {
    this.labelService.deleteLabel(label.labelId, this.note.noteId).subscribe(response => {
      this.getLabels();
      this.snackBar.open("label deleted", "Ok", { duration: 2000 });
    }, error => {
      this.snackBar.open("error", "error to delete labels", { duration: 2000 });
    }
    )
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
      console.log("Label ", label);
      this.getLabels();
      this.snackBar.open("label created", "Ok", { duration: 2000 });
    }, error => {
      this.snackBar.open("error", "error to create labels", { duration: 2000 });
    }
    )

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
}
