import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireStorage} from 'angularfire2/storage';
import {Router} from '@angular/router';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class ImageuploadService {

  constructor(private af: AngularFireDatabase, private storage: AngularFireStorage, private router: Router) { }
  onUpload(db_url, name, previous_url, object, image){
    console.log('HI');
    $('#add').css('display', 'none');
    $('#loading').css('display', 'block');
    const filePath = db_url + '/' + name;
    this.storage.upload(filePath, name).then( () => {
      this.storage.ref(filePath).getDownloadURL().subscribe(data => {
        image = data;
        this.af.object(db_url + '/' + this.af.createPushId()).set(object);
        this.router.navigate([previous_url]);
      });
    });
  }
}
