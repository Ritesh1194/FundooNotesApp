import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatenoteComponent } from 'src/app/component/updatenote/updatenote.component';
import { CreatenoteComponent } from '../createnote/createnote.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  notes: any[];
  getAllNotes: [];
  constructor(private noteservice: NoteServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.noteservice.getAllNotes(localStorage.getItem('token')).subscribe((response: any) => {
      console.log(response);
      this.notes = response.obj;
    });

  }
  openDialog(note: any) {
    console.log("open" + this.notes);

    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px',
      data: { note }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}