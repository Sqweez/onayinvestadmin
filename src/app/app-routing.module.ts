import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectinfoComponent} from './projectinfo/projectinfo.component';
import {MainComponent} from './main/main.component';
import {ContestsComponent} from './contests/contests.component';
import {EducationComponent} from './education/education.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ContestInfoComponent} from './contest-info/contest-info.component';
import {ContestAddComponent} from './contest-add/contest-add.component';
import {UsersComponent} from './users/users.component';
import {EducationAddComponent} from './education-add/education-add.component';
import {EducationinfoComponent} from './educationinfo/educationinfo.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';
import {ContactAddComponent} from './contact-add/contact-add.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {DeniedComponent} from './denied/denied.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  redirectTo: '',
  pathMatch: 'full',
  canActivate: [AuthGuard]
},
  {
    path: 'denied',
    component: DeniedComponent
  },
  {
    path: 'admin',
    component: LoginComponent
  },
  {
    path: 'education',
    component: EducationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: EducationAddComponent
      },
      {
        path: ':id',
        component: EducationinfoComponent
      }
    ]
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UsersComponent,
    children: [{
      path: ':id',
      component: UserInfoComponent,
      children: [{
        path: ':id',
        component: ProjectinfoComponent
      }]
    }]
  },
  {
    path: 'contests',
    canActivate: [AuthGuard],
    component: ContestsComponent,
    children: [
      {
        path: 'create',
        component: ContestAddComponent
      },
      {
        path: ':id',
        component: ContestInfoComponent
      },
    ]
  },
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    component: ContactsComponent,
    children: [
      {
        path: 'create',
        component: ContactAddComponent
      },
      {
        path: ':id',
        component: ContactEditComponent
      }
    ]
  },
  {
    path: 'projects',
    canActivate: [AuthGuard],
    component: ProjectsComponent,
    children: [
      {
        path: ':id',
        component: ProjectinfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
