import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthServiceService} from './auth-service.service';
import * as $ from 'jquery';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthGuard} from './auth.guard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string;
  title = 'app';
  data = {} as any;
  isLogged = false;
  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    public auth: AuthServiceService,
    public db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(data => {
      if(data){
        this.db.object('profile/' + data.uid).valueChanges().subscribe(info => {
          this.data = info;
          if(this.data.admin === 1) {
            this.isLogged = true;
            this.router.navigate(['']);
          }
          else{
            alert('Простите, это закрытая часть проекта только для администрации');
            this.afAuth.auth.signOut();
            window.location.href = "https://www.google.kz";
          }
        });
      }
      else{
        this.router.navigate(['admin']);
      }
    });
  }
  logOut(){
    this.afAuth.auth.signOut();
    this.router.navigate(['admin']);
  }
}
