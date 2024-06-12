import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public proyectoTitulo:string = '' 
  public usuarioRegistrado: string = ''
  public actualizar:boolean=false
  public id:any

  constructor() {

   }

 

}



