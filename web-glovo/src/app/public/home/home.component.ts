import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  window: any;
  constructor(public general: GeneralService, public data: PublicService) {
    this.window = window;
  }
}
