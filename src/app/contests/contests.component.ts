import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {Contest} from '../../models/contest';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {
  contests: Observable<Contest[]>;
  id: string;
  constructor(private af: AngularFireDatabase, public route: ActivatedRoute) {
    this.contests = af.list<Contest>('news').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  ngOnInit() {
  }

  deleteContest(){
    this.af.object('news/' + this.id).remove();
    $('#cancelModal').click();
  }

}
