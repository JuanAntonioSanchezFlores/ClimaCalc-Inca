import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProyectoPageRoutingModule } from './proyecto-routing.module';
import { ProyectoPage } from './proyecto.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProyectoPageRoutingModule
  ],
  declarations: [ProyectoPage]
})
export class ProyectoPageModule {}
