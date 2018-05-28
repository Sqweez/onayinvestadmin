import { Component, OnInit } from '@angular/core';
import {Contacts} from '../../models/contact';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireStorage} from 'angularfire2/storage';
import {Router} from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
  contact = {} as Contacts;
  image: any = null;
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  onUpload(){
    $('#add').css('display', 'none');
    $('#loading').css('display', 'block');
    const filePath = 'contacts' + this.image;
    this.storage.upload(filePath, this.image).then(() => {
      this.storage.ref(filePath).getDownloadURL().subscribe(data => {
        this.contact.logo = data;
        this.db.object('contacts/' + this.db.createPushId()).set(this.contact);
        this.router.navigate(['contacts']);
      });
    });
  }

  ngOnInit() {
  }
  onFileSelected(event){
    this.image = event.target.files[0];
  }

}
