import { HostListener } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if(this._modal.hasOpenModals()){
      window.history.forward();
      this._modal.dismissAll();
    }
  }
  constructor(private router: Router,private _modal:NgbModal) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
  title = 'vinatexv1';
}
