import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/component/login/login.component';
import { RegisterComponent } from 'src/app/component/register/register.component';
import { ForgotpasswordComponent } from 'src/app/component/forgotpassword/forgotpassword.component';
import { PasswordresetComponent } from 'src/app/component/passwordreset/passwordreset.component';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { CreatenoteComponent } from 'src/app/component/createnote/createnote.component';
import { NotesComponent } from 'src/app/component/notes/notes.component';
import { UpdatenoteComponent } from 'src/app/component/updatenote/updatenote.component';
import { DisplayNotesComponent } from './component/display-notes/display-notes.component';
const routes: Routes = [
  { path: "login", component: LoginComponent },

  { path: '', component: LoginComponent },

  { path: "register", component: RegisterComponent },

  { path: "passwordforgot", component: ForgotpasswordComponent },

  { path: "resetPassword/:token", component: PasswordresetComponent },

  {
    path: "dashboard", component: DashboardComponent,
    children: [

      {
        path: '', redirectTo: 'notes', pathMatch: 'full'
      },
      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path: "createnote",
        component: CreatenoteComponent
      },
      {
        path: 'displaynotes',
        component: DisplayNotesComponent
      },
      {
        path: 'update',
        component: UpdatenoteComponent
      }
    ]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
