import { Component, OnInit, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Note } from 'src/app/core/model/note';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selectedMoment = new Date();
  min = new Date();
  selectedFiles: File;
  showDelete = false;
  notes: any;

  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note, private noteService: NoteServiceService,
    private snackBar: MatSnackBar, private dialog: MatDialog,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  closeClick(newNote) {
    console.log(newNote.title);
    console.log(newNote.description);
    this.updateNote(newNote);
  }

  pinned(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    this.updateNote(note);
  }
  note: Note = new Note();

  updateNote(newNote) {
    this.noteService.updateNote(newNote, localStorage.getItem('token'), this.note.noteId
    ).subscribe(response => {
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

  updateColor(data) {
    this.updateNote(data.note);
  }

  saveRemainder(selectedMoment, note) {
    note.remainder = selectedMoment;
    this.updateNote(note);
  }

  // public onFileChanged(event, note) {
  //   this.selectedFiles = event.target.files[0];
  //   this.uploadImage(note);
  // }

  // public uploadImage(note) {
  //   this.noteService.addImage(this.selectedFiles, note.noteId).subscribe((resp) => {
  //     console.log("image added")
  //     this.updateNote(note);
  //   }
  //   );
  // }

  // public getImages(image, note): any {
  //   const url = `data:${note.contentType};base64,${image.images}`;
  //   return this.sanitizer.bypassSecurityTrustUrl(url);
  // }

  // public deleteImage(image,note)
  // {
  //   console.log(image.imagesId)
  //   this.noteService.removeImage(image.imagesId).subscribe((resp)=>
  //   {
  //     console.log("successfull")
  //     this.updateNote(note);
  //   })
  // }
  // removeLabel(label, note) {
  //   this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
  //     console.log("deleting check in database");
  //     this.dialogRef.close();
  //   }, (error) => console.log(error));
  // }

  // addNoteLabel(data) {
  //   this.updateNote(data.note);
  // }


}