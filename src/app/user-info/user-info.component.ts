import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {Project} from '../../models/project';
import {map} from 'rxjs/internal/operators';
import * as $ from 'jquery';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  id: string;
  user = {};
  projects: Observable<Project[]>;

  constructor(
    public route: ActivatedRoute,
    private db: AngularFireDatabase
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data.id;
    });
    this.user = this.db.object('profile/' + this.id).valueChanges();
    this.projects = this.db.list<Project>('projects',
      ref => ref.orderByChild('uid')
        .equalTo(this.id))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
      );
    this.projects.subscribe(data => {
      if(data.length > 0){
        $('.projects').css('visibility', 'visible');
        $('.projectNone').css('visibility', 'hidden');
      }
    });
  }

}
