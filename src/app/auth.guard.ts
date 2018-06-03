import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, timer} from 'rxjs';
import {AuthServiceService} from './auth-service.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  data = {} as any;
  constructor(
    private auth: AuthServiceService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase){}
  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.afAuth.auth.currentUser){
      return true;
    }
    else{
      console.log('i am not ok');
      return false;
    }
  }
}
