import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  email: string;
  password: string;
  admin: number;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
   isAdmin(){
   console.log(this.db.object('profile/' + this.afAuth.auth.currentUser.uid + '/admin'));
  }
  isLogged(){
    if(this.afAuth.auth.currentUser != null){
      return true;
    }
    else{
      return false;
    }
  }
}
