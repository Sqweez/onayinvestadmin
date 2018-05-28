import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Contest} from '../../models/contest';
import {AngularFireStorage} from 'angularfire2/storage';
import * as $ from 'jquery';
@Component({
  selector: 'app-contest-info',
  templateUrl: './contest-info.component.html',
  styleUrls: ['./contest-info.component.css']
})
export class ContestInfoComponent implements OnInit {
  contest: Observable<any>;
  newContest = {} as Contest;
  id: string;
  image: any;

  constructor(
    private db: AngularFireDatabase,
    public route: Router,
    public router: ActivatedRoute,
    private storage: AngularFireStorage) {
  }

  onFileSelected(event) {
    this.image = event.target.files[0];
  }

  update() {
    $('#contestAdd').css('display', 'none');
    $('#contestLoading').css('display', 'block');
    if (this.image != null) {
      const filePath = 'news/' + this.image.name;
      this.storage.upload(filePath, this.image).then(() => {
        this.storage.ref(filePath).getDownloadURL().subscribe(data => {
          this.newContest.image = data;
          this.db.object('news/' + this.id + '/').update(this.newContest);
          this.route.navigate(['contests']);
        });
      });
    }
    else{
      this.db.object('news/' + this.id + '/').update(this.newContest);
      this.route.navigate(['contests']);
    }
  }

  ngOnInit() {
    this.router.params.subscribe(data => {
      this.id = data.id;
    });
    this.contest = this.db.object('news/' + this.id).valueChanges();
  }

}
