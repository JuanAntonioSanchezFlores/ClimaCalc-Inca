import { Component, OnInit } from '@angular/core';
import { ClimaServiceService } from '../clima-service.service';
import { ProyectosInterfaz } from '../proyectos-interfaz';
import { RecintosInterfaz } from '../recintos-interfaz';
import { Router } from '@angular/router';

import { AlertController} from "@ionic/angular";

import { GlobalService } from 'src/app/shared/global.service';





@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {

  email:string = ''
  variableGlobal : string = ''
  variableGlobalTituloProject: string = ''
  actualizar:boolean=false
  id:any
  

  public idSelect: string='';
  listaProyectos:ProyectosInterfaz[]=[];
 

  proyectoSelec:string=""
  
  proyectoId:any

  vistaProyectos = false
 sumaRefrigeracion:any
 sumaCalefaccion:any 


  mostrarProyecto:boolean = true
  public editar = true;
  public visual = true;



  constructor(private router:Router, private alertController:AlertController,
              public globalService: GlobalService, private consulta:ClimaServiceService ) { }


                     
  ngOnInit() {
   
      this.variableGlobal = this.globalService.usuarioRegistrado
      this.globalService.actualizar = this.actualizar
      
      this.listarProyectos()
      
      
      
}


verProyecto(){
  if(this.mostrarProyecto == true){
  this.mostrarProyecto = false
}else{
  this.mostrarProyecto = true
}
}
  
sumarPotenciasCalefaccion(proyecto:ProyectosInterfaz){
  this.sumaCalefaccion = 0
  
  for(let rec of proyecto.recintos){
    console.log("potencia calefaccion", rec.potenciaCalefaccion)
    this.sumaCalefaccion = rec.potenciaCalefaccion + this.sumaCalefaccion
    }
    console.log("Calefaccion: ", this.sumaCalefaccion)
}

nuevoProyecto(){
  this.globalService.actualizar = false
    this.router.navigate(['/proyecto', { email: this.variableGlobal, actualizar:this.globalService.actualizar}])
}

actualizarProyecto(id:any){
  this.globalService.usuarioRegistrado = this.variableGlobal
  this.globalService.id = id
  this.router.navigate(['/actualizar-proyecto', { email: this.variableGlobal, id:this.globalService.id}])
}

borrarProyecto(id:any){
  this.consulta.deleteProyecto(id)
  this.ngOnInit()
}

proyectoSeleccionado(titulo:string, id:any) {
  let nombreProyecto = titulo
  this.globalService.id = id
  this.mostrarProyecto = true
  this.router.navigate(['/camaras', {proyectoTitulo:nombreProyecto, id:this.globalService.id}])

  
}

hola(){
  console.log("hola mundo")
}

  home(){
    this.router.navigate(['/home'])
  }

  
  iconoPuntos(idProyecto: any) {
    if(idProyecto != undefined){
      var rowElement = document.getElementById(idProyecto);
      if (rowElement) {
        var estiloComputado = window.getComputedStyle(rowElement);
        var display = estiloComputado.display
        if (display == 'none') {
          rowElement.style.display = 'inline-flex';
          this.mostrarProyecto = false
        } else {
          rowElement.style.display = 'none';
          this.mostrarProyecto = false
        }
      }
    }
   
  }
  

  click(){
    console.log("click en editar")
  }

  onClick(){
    this.router.navigate(['/home'])
  }

  onMouseEnter() {
    console.log("Estoy encima")
  }

  onMouseLeave() {
    console.log("Estoy encima")
  }

  logout(){
    this.confirmarSalirLogin()
  }

  async confirmarSalirLogin() {
    const alert = await this.alertController.create({
      header: 'Confirmar salida',
      message: '¿Estás seguro de que deseas salir del login?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelar');
          }
        }, {
          text: 'Salir',
          handler: () => {
            
            this.router.navigate(['/home'])

          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  obtenerEmailUsuarioRegistrado(email:string){
    this.email = email
  }

  listarProyectos(){
    this.consulta.readDb('proyectos').subscribe(res=>{
      this.listaProyectos=[]; //Vaciamos la lista de proyectos para agregar la nueva obtenida de la DB
      res.forEach((element:any)=>{
        this.listaProyectos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()})
      });
      
    })
  }

  


}
