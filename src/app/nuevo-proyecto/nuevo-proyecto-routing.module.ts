import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoProyectoPage } from './nuevo-proyecto.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoProyectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoProyectoPageRoutingModule {}
