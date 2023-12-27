import { Component } from '@angular/core';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-legal-privacy',
  templateUrl: './legal-privacy.component.html',
  styleUrls: ['./legal-privacy.component.sass'],
})
export class LegalPrivacyComponent {
  constructor(public general: GeneralService) {}

  getHeight() {
    return window.innerHeight + 'px';
  }
  get70() {
    var resp = (window.innerHeight * 80) / 100;
    return resp + 'px';
  }
}
