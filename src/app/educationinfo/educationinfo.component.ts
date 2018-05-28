import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Education} from '../../models/education';
import * as $ from 'jquery';
import {async} from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-educationinfo',
  templateUrl: './educationinfo.component.html',
  styleUrls: ['./educationinfo.component.css']
})
export class EducationinfoComponent implements OnInit {
  edu: Observable<any>;
  newEdu = {} as Education;
  id: string;
  image: any;
  videoURL: string;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.route.params.subscribe(data => {
      this.id = data.id;
    });
    this.edu = this.db.object('education/' + this.id).valueChanges();
    this.edu.subscribe(data => {
      this.videoURL = data.url;
    });
  }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.image = event.target.files[0];
  }

  getVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return 'error';
    }
  }

  update() {
    if(this.newEdu.url !== undefined){
      this.newEdu.url = 'https://www.youtube.com/embed/' + this.getVideoId(this.newEdu.url);
    }
    console.log(this.newEdu.title);
    $('#add').css('display', 'none');
     $('#loading').css('display', 'block');
     if (this.image != null) {
       const filePath = 'education/' + this.image.name;
       this.storage.upload(filePath, this.image).then(() => {
         this.storage.ref(filePath).getDownloadURL().subscribe(data => {
           this.newEdu.imageUrl = data;
           this.db.object('education/' + this.id + '/').update(this.newEdu);
           this.router.navigate(['education']);
         });
       });
     }
     else {
       this.db.object('education/' + this.id + '/').update(this.newEdu);
       this.router.navigate(['education']);
     }
  }

}
