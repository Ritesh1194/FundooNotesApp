import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/app/component/login/login.component';
import { RegisterComponent } from 'src/app/component/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ForgotpasswordComponent } from 'src/app/component/forgotpassword/forgotpassword.component';
import { PasswordresetComponent } from 'src/app/component/passwordreset/passwordreset.component';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DisplayNotesComponent } from 'src/app/component/display-notes/display-notes.component';
import { CreatenoteComponent } from 'src/app/component/createnote/createnote.component';
import { NotesComponent } from 'src/app/component/notes/notes.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdatenoteComponent } from 'src/app/component/updatenote/updatenote.component';
import { MatSelectModule } from '@angular/material/select';
import { IconlistComponent } from "src/app/component/iconlist/iconlist.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CollaboratorComponent } from "src/app/component/collaborator/collaborator.component";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LabelsComponent } from "src/app/component/labels/labels.component";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditLabelsComponent } from 'src/app/component/edit-labels/edit-labels.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    PasswordresetComponent,
    DashboardComponent,
    DisplayNotesComponent,
    CreatenoteComponent,
    NotesComponent,
    UpdatenoteComponent,
    IconlistComponent,
    CollaboratorComponent, LabelsComponent, EditLabelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule, OwlDateTimeModule, OwlNativeDateTimeModule, MatTooltipModule, MatAutocompleteModule,MatCheckboxModule

  ],
  entryComponents: [UpdatenoteComponent, CollaboratorComponent, LabelsComponent,EditLabelsComponent],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],

  bootstrap: [AppComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
