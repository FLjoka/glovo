import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GloboSelectComponent } from './globo-select/globo-select.component';
import { GlovoConfirmComponent } from './glovo-confirm/glovo-confirm.component';
import { GlovoMenuComponent } from './glovo-menu/glovo-menu.component';
import { MapaComponent } from './mapa/mapa.component';
import { GlovoInfoComponent } from './glovo-info/glovo-info.component';
import { PassConfirmComponent } from './pass-confirm/pass-confirm.component';
import { FormsModule } from '@angular/forms';
import { ReturnEmailComponent } from './return-email/return-email.component';

@NgModule({
  declarations: [
    GloboSelectComponent,
    GlovoConfirmComponent,
    GlovoMenuComponent,
    MapaComponent,
    GlovoInfoComponent,
    PassConfirmComponent,
    ReturnEmailComponent,
  ],
  exports: [
    GloboSelectComponent,
    GlovoConfirmComponent,
    GlovoMenuComponent,
    MapaComponent,
    GlovoInfoComponent,
    PassConfirmComponent,
    ReturnEmailComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class ComponentesModule {}
