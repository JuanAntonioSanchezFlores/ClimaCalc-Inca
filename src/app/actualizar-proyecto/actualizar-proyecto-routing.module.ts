import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarProyectoPage } from './actualizar-proyecto.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarProyectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarProyectoPageRoutingModule {}
