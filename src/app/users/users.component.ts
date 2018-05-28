import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import * as $ from 'jquery';
import {async} from 'rxjs/internal/scheduler/async';

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
    public router: Router
  ) { }

  ngOnInit() {
    this.users = this.db.list('profile/').snapshotChanges().pipe(
      map(changes =>
      changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    );
  }
  deleteUser(){
    this.db.object('profile/' + this.id).remove();
    $('#cancelModal').click();
  }

}
