import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireStorage} from 'angularfire2/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Contacts} from '../../models/contact';
import * as $ from 'jquery';
@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact = {} as Contacts;
  oldContact: Observable<any>;
  id: string;
  image: any;
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  onFileSelected(event){
    this.image = event.target.files[0];
  }
  onUpload(){
    $('#add').css('display', 'none');
    $('#loading').css('display', 'block');
    if (this.image != null){
      const filePath = 'contacts/' + this.image;
      this.storage.upload(filePath, this.image).then(() => {
        this.storage.ref(filePath).getDownloadURL().subscribe(data => {
          this.contact.logo = data;
          this.db.object('contacts/' + this.id).update(this.contact);
        });
      });
    }
    else{
      this.db.object('contacts/' + this.id).update(this.contact);
    }
    this.router.navigate(['contacts']);
  }
  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data.id;
    });
    this.oldContact = this.db.object('contacts/' + this.id).valueChanges();
  }

}
