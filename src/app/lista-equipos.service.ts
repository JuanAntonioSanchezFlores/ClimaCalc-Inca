import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaEquiposService {

  listaEquipos: { nombre: string, potencia: number, factorFuncionamiento: number }[] = [];

  constructor() { }

  agregarEquipo(nombre: string, potencia: number, factorFuncionamiento: number): void {
    const nuevoEquipo = { nombre, potencia, factorFuncionamiento };
    this.listaEquipos.push(nuevoEquipo);
  } 

  obtenerEquipos(): { nombre: string, potencia: number, factorFuncionamiento: number }[] {
    return this.listaEquipos;
  }
}
