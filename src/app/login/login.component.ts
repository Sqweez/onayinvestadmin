import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AuthServiceService} from '../auth-service.service';
import {async} from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    public auth: AuthServiceService) { }

  ngOnInit() {
  }

  async login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
  }
}
