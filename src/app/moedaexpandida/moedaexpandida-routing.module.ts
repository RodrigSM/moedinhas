import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoedaexpandidaPage } from './moedaexpandida.page';

const routes: Routes = [
  {
    path: '',
    component: MoedaexpandidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoedaexpandidaPageRoutingModule {}
