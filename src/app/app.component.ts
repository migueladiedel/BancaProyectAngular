import { Component, OnInit } from '@angular/core';
import { NotifyService } from './services/notify.service';

import { Router, NavigationEnd, ActivatedRoute, ActivationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private ns: NotifyService, private router: Router, private title: Title) {
  }
  ngOnInit(): void {
    // this.ns.add('Demo error en AppComponent');
    this.router.events.subscribe(ev => {
      if (ev instanceof ActivationStart) {
        if ((ev as ActivationStart).snapshot.data && (ev as ActivationStart).snapshot.data.pageTitle) {
          this.title.setTitle((ev as ActivationStart).snapshot.data.pageTitle);
        } else {
          this.title.setTitle('Curso de Angular');
        }
      }
    });
  }

}

