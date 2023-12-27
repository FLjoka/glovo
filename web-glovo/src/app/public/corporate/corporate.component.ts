import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.sass']
})
export class CorporateComponent implements OnInit {
  window: any;
  constructor(public general: GeneralService, public data: PublicService) {
    this.window = window;
  }
  ngOnInit(): void {
    if (!this.data.corporate)
      this.data.getCorporate();
  }

}
