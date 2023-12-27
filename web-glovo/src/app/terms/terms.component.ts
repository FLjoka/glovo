import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.sass'],
})
export class TermsComponent {
  subscribe!: Subscription;
  constructor(public general: GeneralService) {}

  ngDestroy() {
    this.subscribe.unsubscribe();
  }
  getHeight() {
    return window.innerHeight + 'px';
  }
  get70() {
    var resp = (window.innerHeight * 80) / 100;
    return resp + 'px';
  }
}
