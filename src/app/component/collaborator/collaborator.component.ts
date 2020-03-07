import { Component, OnInit, Inject } from '@angular/core';
import { UserserviceService } from 'src/app/core/services/userservice.service';
import { User } from 'src/app/core/model/user';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Note } from 'src/app/core/model/note';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NoteServiceService } from 'src/app/core/services/note-service.service';
import { error } from 'util';

interface ImageData {
  imageSrc: any;
}

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  public email = '';
  public imageData = <ImageData>{};
  public myControl = new FormControl();
  public users: User[] = [];
  public collabUsers: User[] = [];
  subscription: any;


  constructor(private userService: UserserviceService, public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private snackBar: MatSnackBar, private sanitizer: DomSanitizer,
    private noteService: NoteServiceService) {
    this.subscription = userService.getUsers().subscribe(message => {
      console.log("in display Label subscrib....", message.users);
      this.users = message.users;
      console.log("Others Label:", this.users);
    });
  }

  ngOnInit() {
    this.getUsers();
    //this.getCollaborateUser();
    // this.getNoteOwner();
  }

  // public getNoteOwner()
  // {
  //   this.userService.getCollaborateUser(this.note.userId).subscribe(
  //     user => this.user=user);
  // }
  public getUsers() {
    this.userService.getUsers().subscribe(({ body }) => {
      this.users = body;
      console.log(this.users)
    }
      , error => console.log("error"));
  }

  collaborate(email: string) {
    this.noteService.createCollaborator(this.email, this.note.noteId).subscribe(resp => {
      //this.dialogRef.close();
      this.snackBar.open("added to collaborator", "ok", { duration: 2000 })
    }
    );
    error => {
      this.snackBar.open("email not present or collaborator already present", "error", { duration: 2000 });
    }

  }

  closeClick() {
    this.dialogRef.close();
  }


  // getCollaborateUser() {
  //   for (let i = 0; i < this.note.collaborators.length; i++) {
  //     var k = 0;
  //     this.userService.getCollaborateUser(this.note.collaborators[i].userId).subscribe(
  //       user => {
  //         this.collabUsers[k] = user;
  //         k++;
  //       }
  //       , error => console.log(error))
  //   }
  // }


}