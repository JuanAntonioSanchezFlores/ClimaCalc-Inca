import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarProyectoPageRoutingModule } from './actualizar-proyecto-routing.module';

import { ActualizarProyectoPage } from './actualizar-proyecto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarProyectoPageRoutingModule
  ],
  declarations: [ActualizarProyectoPage]
})
export class ActualizarProyectoPageModule {}
