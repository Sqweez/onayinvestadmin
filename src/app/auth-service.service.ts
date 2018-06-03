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
  data = {} as any;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
   isAdmin(){
    this.afAuth.authState.subscribe(data => {
      this.db.object('profile/' + data.uid).valueChanges().subscribe(info => {
        this.data = info;
        if(this.data.admin === 1){
          return true;
        }
        else{
          return false;
        }
      });
    });
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
