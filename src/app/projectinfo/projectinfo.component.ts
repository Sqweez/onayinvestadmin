import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Project} from '../../models/project';
import {AngularFireDatabase} from 'angularfire2/database';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-projectinfo',
  templateUrl: './projectinfo.component.html',
  styleUrls: ['./projectinfo.component.css']
})
export class ProjectinfoComponent implements OnInit {
  public projectId: string;
  project: Observable<any>;
  profile: Observable<any>;
  video: any;
  hasVideo = false;
  constructor(private router: Router, private rt: ActivatedRoute, private db: AngularFireDatabase, private sanitizer: DomSanitizer) {
  }
  acceptProject() {
    const itemRef = this.db.object('projects/' + this.projectId);
    itemRef.update({ isAccepted: 1 });
    this.router.navigate(['projects']);
  }
  declineProject() {
    this.db.object('projects/' + this.projectId).update({ isAccepted: 2 });
    this.router.navigate(['projects']);
  }
  deleteProject(){
    this.db.object('projects/' + this.projectId).remove();
    this.router.navigate(['projects']);
  }
  ngOnInit() {
    console.log('hi');
    this.rt.params.subscribe(data => {
      console.log(data);
      this.projectId = data.id;
    });
      this.project = this.db.object('projects/' + this.projectId).valueChanges();
      this.project.subscribe(data => {
        if(data.videoUrl){
          this.hasVideo = true;
          this.video = this.sanitizer.bypassSecurityTrustResourceUrl(data.videoUrl);
        }
        this.profile = this.db.object('profile/' + data.uid).valueChanges();
      });
  }
}
