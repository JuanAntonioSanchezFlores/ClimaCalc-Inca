import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/proyectos',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login-admin',
    loadChildren: () => import('./login-admin/login-admin.module').then( m => m.LoginAdminPageModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./proyectos/proyectos.module').then( m => m.ProyectosPageModule)
  },
  {
    path: 'nuevo-proyecto',
    loadChildren: () => import('./nuevo-proyecto/nuevo-proyecto.module').then( m => m.NuevoProyectoPageModule)
  },
  {
    path: 'login-alumno',
    loadChildren: () => import('./login-alumno/login-alumno.module').then( m => m.LoginAlumnoPageModule)
  },
  {
    path: 'proyecto',
    loadChildren: () => import('./proyecto/proyecto.module').then( m => m.ProyectoPageModule)
  },
  {
    path: 'proyecto/:variableRecibida',
    loadChildren: () => import('./proyecto/proyecto.module').then( m => m.ProyectoPageModule)
  },
  {
    path: 'camaras',
    loadChildren: () => import('./camaras/camaras.module').then( m => m.CamarasPageModule)
  },
  {
    path: 'actualizar-proyecto',
    loadChildren: () => import('./actualizar-proyecto/actualizar-proyecto.module').then( m => m.ActualizarProyectoPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
