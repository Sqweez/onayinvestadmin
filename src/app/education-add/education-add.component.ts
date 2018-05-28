import { Component, OnInit } from '@angular/core';
import {Education} from '../../models/education';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireStorage} from 'angularfire2/storage';
import {Router} from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-education-add',
  templateUrl: './education-add.component.html',
  styleUrls: ['./education-add.component.css']
})
export class EducationAddComponent implements OnInit {
  education = {} as Education;
  image: any = null;ng
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private router: Router) { }

  ngOnInit() {
  }
  onFileSelected(event){
    this.image = event.target.files[0];
    console.log(this.image);
  }
  getVideoId(url){
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return 'error';
    }
  }
  onUpload() {
    $('#add').css('display', 'none');
    $('#loading').css('display', 'block');
    const filePath = 'education/' + this.image.name;
    this.storage.upload(filePath, this.image).then(() => {
      this.storage.ref(filePath).getDownloadURL().subscribe(data => {
        this.education.imageUrl = data;
        this.education.url = 'https://www.youtube.com/embed/' + this.getVideoId(this.education.url);
        this.db.object('education/' + this.db.createPushId()).set(this.education);
        this.router.navigate(['education']);
      });
    });
  }

}
