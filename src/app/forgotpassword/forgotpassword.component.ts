import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  constructor(private userservice: UserserviceService,
    private router: Router,
    //private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('')
    })
  }

  onSubmit(form: NgForm) {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    else {
      var email = this.forgotPasswordForm.value
    }
    console.log("email", email);

    this.userservice.forgotPassword(email).subscribe((user) => {
      console.log("user is------>>>", user, email);
      localStorage.setItem("token", user.response)
      //this.router.navigateByUrl("dashboard")
      // this.snackbar.open('registration successfully verify by email', 'Ok', { duration: 3000 });

    },
      (error: any) => {
        console.log(error);
        //this.snackbar.open(error.error.description, 'error', { duration: 3000 });
      });
  }
}
