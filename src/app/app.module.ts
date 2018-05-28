import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectinfoComponent } from './projectinfo/projectinfo.component';
import {AngularFireModule} from 'angularfire2';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { MainComponent } from './main/main.component';
import { EducationComponent } from './education/education.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContestsComponent } from './contests/contests.component';
import { ContestInfoComponent } from './contest-info/contest-info.component';
import { ContestAddComponent } from './contest-add/contest-add.component';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {FormsModule} from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { EducationAddComponent } from './education-add/education-add.component';
import { EducationinfoComponent } from './educationinfo/educationinfo.component';
import { ImageUploadPipe } from './image-upload.pipe';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginComponent } from './login/login.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { DeniedComponent } from './denied/denied.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectinfoComponent,
    MainComponent,
    EducationComponent,
    ContactsComponent,
    ContestsComponent,
    ContestInfoComponent,
    ContestAddComponent,
    UsersComponent,
    EducationAddComponent,
    EducationinfoComponent,
    ImageUploadPipe,
    ContactAddComponent,
    ContactEditComponent,
    UserInfoComponent,
    LoginComponent,
    DeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
