import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Routes, RouterModule } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;

  constructor(
    private userService: UserserviceService,
    private router: Router,
    // private snackbar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl('')

    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');

      console.log(this.token);
    });
  }
  onSubmitReset(form: NgForm) {
    console.log(form);
    if (this.resetPasswordForm.invalid) {
      return;
    }
    console.log(this.token);

    this.userService.resetPassword(this.resetPasswordForm.value).subscribe((user) => {
      console.log(user);
      //this.snackbar.open('password changed', 'ok', { duration: 3000 });
      this.router.navigateByUrl('/login');
    },
      (error) => {
        console.log(error);
        // this.snackbar.open(error.error.description, 'error', { duration: 3000 });
      });
  }
}