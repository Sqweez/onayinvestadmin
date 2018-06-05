import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Contest} from '../../models/contest';
import {AngularFireStorage} from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/internal/operators';
import {async} from 'rxjs/internal/scheduler/async';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-contest-add',
  templateUrl: './contest-add.component.html',
  styleUrls: ['./contest-add.component.css']
})
export class ContestAddComponent implements OnInit {

  contest = {} as Contest;
  image: any = null;
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private router: Router
  ) {
  }

  onFileSelected(event) {
    this.image = event.target.files[0];
  }

  onUpload() {
    $('#add').css('display', 'none');
    $('#loading').css('display', 'block');
    const filePath = 'news/' + this.image.name;
    this.storage.upload(filePath, this.image).then(() => {
      this.storage.ref(filePath).getDownloadURL().subscribe(data => {
        this.contest.image = data;
        console.log(this.contest);
        this.contest.likeCount = 0;
        this.contest.viewCount = 0;
        this.db.object('news/' + this.db.createPushId()).set(this.contest);
        this.router.navigate(['contests']);
      });
    });
  }

  ngOnInit() {
  }

}
