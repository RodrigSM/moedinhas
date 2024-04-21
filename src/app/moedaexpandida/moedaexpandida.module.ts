import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoedaexpandidaPageRoutingModule } from './moedaexpandida-routing.module';

import { MoedaexpandidaPage } from './moedaexpandida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoedaexpandidaPageRoutingModule
  ],
  declarations: [MoedaexpandidaPage]
})
export class MoedaexpandidaPageModule {}
