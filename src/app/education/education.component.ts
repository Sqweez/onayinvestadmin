import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {Education} from '../../models/education';
import {map} from 'rxjs/internal/operators';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import * as $ from 'jquery';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  id: string;
  education: Observable<Education[]>;
  constructor(private db: AngularFireDatabase, public route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.education = this.db.list<Education>('education').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }
  safeVideoUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnInit() {
  }
  deleteEducation(){
    this.db.object('education/' + this.id).remove();
    this.db.list('likes/education/' + this.id).remove();
    this.db.list('views/education/' + this.id).remove();
    $('#cancelModal').click();
  }

}
