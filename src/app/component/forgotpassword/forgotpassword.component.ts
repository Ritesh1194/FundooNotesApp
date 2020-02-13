import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/core/services/userservice.service';
import { HttpService } from 'src/app/core/services/httpservice.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserserviceService,
    private httpUtil: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  get f() { return this.forgotForm.controls; }

  onSubmit(user) {
    this.submitted = true;

    if (this.forgotForm.invalid) {
      return;
    }
    console.log(user);
    this.userService.forgotpassword(user).subscribe(response => {
      console.log("reset password mail sent to your email");
      this.snackBar.open("open your email to reset password", "Ok", { duration: 2000 })
    }, error => {
      this.snackBar.open("error", "please enter the registered email", { duration: 2000 })
    });
  }
}

