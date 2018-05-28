import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthServiceService} from './auth-service.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string;
  title = 'app';
  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    public auth: AuthServiceService
  ) {
      $('#homeButton').click();
      $('#projectsButton').click();
  }
  logOut(){
    this.afAuth.auth.signOut();
    this.router.navigate(['admin']);
  }
}
