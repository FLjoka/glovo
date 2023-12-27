import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.sass'],
})
export class TrainingComponent {
  items = [
    {
      subtitulo: this.general.getText({ es: 'Subtitulos', en: 'Subtitulos' }),
      descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      img: 'assets/public/training-pina1.png',
    },
    {
      subtitulo: this.general.getText({ es: 'Subtitulos', en: 'Subtitulos' }),
      descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      img: 'assets/public/training-pina2.png',
    },
    {
      subtitulo: this.general.getText({ es: 'Subtitulos', en: 'Subtitulos' }),
      descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      img: 'assets/public/training-pina3.png',
    },
  ];

  constructor(public general: GeneralService, public data: PublicService) {}
}
