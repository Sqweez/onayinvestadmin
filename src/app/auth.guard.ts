import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from './auth-service.service';
import {AngularFireAuth} from 'angularfire2/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthServiceService,
    private afAuth: AngularFireAuth,
    private router: Router){}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.afAuth.auth.currentUser){
      console.log('i am ok');
      return true;
    }
    else{
      console.log('i am not ok');
      this.router.navigate(['admin']);
      return false;
    }
  }
}
