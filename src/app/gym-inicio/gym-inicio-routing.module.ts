import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GymInicioPage } from './gym-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: GymInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GymInicioPageRoutingModule {}
