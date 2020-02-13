import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/core/services/userservice.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserserviceService, private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]],
      lastname: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  get f() { return this.registerForm.controls; }
  public onSubmit(user) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(user);
    this.userService.registration(user).subscribe(response => {
      console.log("registartion successful");
      this.router.navigate(['/login']);
    }, error => {
      this.snackBar.open("error", "cannot register", { duration: 2000 })
    });

  }

}