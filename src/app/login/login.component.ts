
import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private userservice: UserserviceService,
    private router: Router,
    //private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit(form: NgForm) {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);

    this.userservice.login(this.loginForm.value).subscribe((user) => {
      console.log(user);
      // localStorage.setItem("token", user.response)
      // this.router.navigateByUrl("dashboard")
      // this.snackbar.open('registration successfully verify by email', 'Ok', { duration: 3000 });

    },
      (error: any) => {
        console.log(error);
        //this.snackbar.open(error.error.description, 'error', { duration: 3000 });
      });
  }
}
