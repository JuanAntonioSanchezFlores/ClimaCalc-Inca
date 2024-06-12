import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoProyectoPageRoutingModule } from './nuevo-proyecto-routing.module';

import { NuevoProyectoPage } from './nuevo-proyecto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoProyectoPageRoutingModule
  ],
  declarations: [NuevoProyectoPage]
})
export class NuevoProyectoPageModule {}
