import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GymInicioPageRoutingModule } from './gym-inicio-routing.module';

import { GymInicioPage } from './gym-inicio.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GymInicioPageRoutingModule
  ],
  declarations: [
    GymInicioPage
  ],
})
export class GymInicioPageModule {}
