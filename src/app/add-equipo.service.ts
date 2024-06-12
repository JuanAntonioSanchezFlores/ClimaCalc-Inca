import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddEquipoService {

  

  private functionSubject = new Subject<void>();

  conmutar() {
    
    this.functionSubject.next();

  }

  getFunctionSubject() {
    return this.functionSubject.asObservable();
  }
  constructor() { }
}
