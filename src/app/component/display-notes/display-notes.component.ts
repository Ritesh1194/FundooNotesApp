import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  notes:[];
  getAllNotes:[];
  constructor(private noteservice:NoteServiceService,public dialog: MatDialog) { }

  ngOnInit() {
    this.noteservice.getAllNotes(localStorage.getItem('token')).subscribe((response:any)=>
    {
      console.log(response);
      
      this.notes=response.object;
         
    })
    
    
  }
  openDialog(note: any)
  {
    console.log("open"+note.id);
    
    const dialogref=this.dialog.open(EditComponent, {
      panelClass: 'custom-dialog-container' ,
      width:'600px',
      data:{note}
    });
  }


}
