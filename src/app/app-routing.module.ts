import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";

const routes: Routes = [ 
  { path: "login", component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "forgotpassword", component: ForgotpasswordComponent },
  { path: "resetpassword/:token", component: ResetpasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
