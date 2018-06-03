import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Project} from '../../models/project';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  id: string;
  projectsRef: AngularFireList<Project>;
  projects: Observable<Project[]>;
  url: string;
  constructor(private af: AngularFireDatabase, private router: Router, public route: ActivatedRoute) {
    this.projectsRef = af.list('projects');
    this.projects = this.projectsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }
  deleteProject(){
    console.log(this.id);
    this.af.object('projects/' + this.id).remove();
    $('#cancelModal').click();
  }
  ngOnInit() {
    this.url = this.router.url;
    console.log(this.url);
  }
}
