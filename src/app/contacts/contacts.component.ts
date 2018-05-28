import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Contacts} from '../../models/contact';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/internal/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Observable<Contacts[]>;
  id: string;
  constructor(
    private db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.contacts = this.db.list<Contacts>('contacts').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }
  deleteContact(){
    this.db.object('contacts/' + this.id).remove();
    $('#cancelModal').click();
  }
  ngOnInit() {
  }

}
