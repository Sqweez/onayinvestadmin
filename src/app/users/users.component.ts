import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import * as $ from 'jquery';
import {async} from 'rxjs/internal/scheduler/async';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<any[]>;
  id: string;
  projects: Observable<any[]>;
  constructor(
    private db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.users = this.db.list('profile/').snapshotChanges().pipe(
      map(changes =>
      changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    );
  }
  deleteUser(){
    this.db.object('profile/' + this.id).remove();
    this.db.list('projects/', ref => ref.orderByChild('uid').equalTo(this.id)).remove();
    $('#cancelModal').click();
  }
}
