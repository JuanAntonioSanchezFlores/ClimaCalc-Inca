import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonDatetime, IonInput, IonSelect, IonSelectOption, IonTextarea } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { GlobalService } from 'src/app/shared/global.service';
import { ClimaServiceService } from '../clima-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore
import { ProyectosInterfaz } from '../proyectos-interfaz';
import { catchError, map } from 'rxjs/operators';




import { Observable, BehaviorSubject } from 'rxjs';


interface DatosDocumento {
  [key: string]: any; // Puedes especificar un tipo más específico para los campos si lo deseas
}

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.page.html',
  styleUrls: ['./proyecto.page.scss'],
})



export class ProyectoPage implements OnInit {

  
  email:string = ''
  variableGlobal:string = ''
  actualizar:boolean = false
  id:string = ''
  zonasClimaticas:any;
  zonaKeys: string[] = [];
  localidades: any[] = []
  localidadesFiltradas: any[] = [];
  showLocalidades: boolean = false;
  textoBusqueda: string = ''
  proyecto:any = {}

  
  searchTerm: string = ''
  selectedCity:any
  selectedZone:string = ''
  zona:string = ''
  //Valores de zona
  usum:any=0;
	uc:number=0
	utumd:number=0
	uh:number=0
	up:number=0
	uph:number=0
	upv:number=0
	uphv:number=0
  recintos:any[] = []

  tempSueloVerano!:number
  tempSueloInvierno!:number
  tempExteriorI!:number
  tempExteriorV!:number
 

  @ViewChild('fecha') fecha!: IonInput;
  @ViewChild('titulo') titulo!: IonInput;
  @ViewChild('proyectista') proyectista!: IonInput;
  @ViewChild('cliente') cliente!: IonInput;
  @ViewChild('observaciones') observaciones!: IonTextarea;
  
  @ViewChild('altitud') altitud!: IonInput;
  @ViewChild('zonaClimatica') zonaClimatica!: IonSelect;
  @ViewChild('t_exteriorV') t_exteriorV!: IonInput;
  @ViewChild('t_exteriorI') t_exteriorI!: IonInput;
  @ViewChild('h_relativaV') h_relativaV!: IonInput;
  @ViewChild('h_relativaI') h_relativaI!: IonInput;
  @ViewChild('temp_suelo_V') temp_suelo_V!: IonInput;
  @ViewChild('temp_suelo_I') temp_suelo_I!: IonInput;
  @ViewChild('oda') oda!: IonSelect;
  

  constructor(private router:Router, private consulta:AngularFirestore, private alertController:AlertController,
    private paramRuta:ActivatedRoute, private componente: AppComponent,
    public globalService: GlobalService, private  climaService: ClimaServiceService) 
    {
    
    }

    addProyecto(fecha:IonInput,titulo: IonInput, proyectista:IonInput, cliente: IonInput, observaciones: IonTextarea,ciudad:object,
      altitud: IonInput, zonaClimatica: IonSelect, t_exteriorV: IonInput, t_exteriorI:IonInput, h_relativaV:IonInput, 
      h_relativaI:IonInput, temp_suelo_V:IonInput, temp_suelo_I:IonInput, oda:IonSelect,recintos:any ){
     const proyecto: ProyectosInterfaz = {
      fecha: fecha.value,titulo: titulo.value, proyectista: proyectista.value, cliente: cliente.value, observaciones:observaciones.value,ciudad: this.selectedCity['nombre'],
      altitud: altitud.value, zonaClimatica: zonaClimatica.value, t_exteriorV: t_exteriorV.value, t_exteriorI:t_exteriorI.value, h_relativaV:h_relativaV.value,
      h_relativaI:h_relativaI.value, temp_suelo_V:temp_suelo_V.value, temp_suelo_I:temp_suelo_I.value, usum:this.usum, uc:this.uc, utumd: this.utumd, uh:this.uh, up:this.up,uph:this.uph,
      upv:this.upv, uphv:this.uphv, oda: oda.value, recintos:[]}

      let guardar:boolean = false
      this.validarProyecto(proyecto, guardar)
      
      
      if(guardar){
        fecha.value = "", 
        titulo.value = "",
        proyectista.value = "",
        cliente.value = "", 
        observaciones.value = "",
        this.selectedCity = "",
        altitud.value = 0, 
        zonaClimatica.value = "", 
        t_exteriorV.value = 0, 
        t_exteriorI.value = 0,
        h_relativaV.value = 0,
        h_relativaI.value = 0, 
        temp_suelo_V.value = 0, 
        temp_suelo_I.value = 0,
        this.usum = 0,
        this.uc = 0, 
        this.utumd = 0,
        this.uh= 0,
        this.up= 0,
        this.uph = 0,
        this.upv = 0,
        this.uphv = 0,
        oda.value = ""
      }
     
    }

    ngOnInit() {

      this.getLocalidades()

     if (!this.selectedCity ) {
        this.selectedCity = { temp_ext_inv: null, temp_ext_ver: null };//Pone a null estos campos si no hay seleccinado
      }

      this.observeCambioZona()

      this.paramRuta.params.subscribe(params => {
      
        this.variableGlobal = this.globalService.usuarioRegistrado
        this.actualizar = this.globalService.actualizar
        this.id = this.globalService.id
  
      })

    }

    setTempSueloVer(){
      this.tempSueloVerano = (this.tempExteriorV+15)/2
    }
    
    setTempSueloInv(){
    this.tempSueloInvierno = (this.tempExteriorI+15)/2
    }

    favorite(item:string){
      console.log(item)
    }
     

    async obtenerDocumentoPorId(id: string, proyecto:any) {
      const querySnapshot = await this.consulta.collection('proyectos').ref.where('id', '==', id).get();
      querySnapshot.forEach(doc => {
        proyecto = doc.data();
        
      });
      
    }

    // CAMBIO ZONA
    private observeCambioZona(): void {
      let llamadaMetodo = false
      let seleccionada = ''
      setInterval(() => {
        this.zona =this.selectedCity['zona climatica']
        if((this.zona == 'A' ||  this.zona == 'B' ||this.zona == 'C' || this.zona == 'D' || this.zona == 'E' || this.zona == 'F') && !llamadaMetodo ){
          this.obtenerZona()
          seleccionada = this.zona
          llamadaMetodo = true
        }
        if(seleccionada != this.zona){
          llamadaMetodo = false
        }
      }, 1000)
    }

    // METODO PARA OBTENER VALORES DE ZONA
    obtenerZona(){
      console.log("Se ejecuta el metodo")
      this.climaService.getZonaClimatica(this.zona).pipe(
        map(data => {
          let indice = 0
          switch(this.zona){
            case 'A': 
            indice = 0
            break
            case 'B':
              indice = 1
              break
            case 'C':
              indice = 2
              break
            case 'D':
              indice = 3
              break
            case 'E':
              indice = 4
              break
            case 'F':
              indice = 5
              break
          }
          const dato = data[indice][this.zona]
          this.usum = dato['us/um']
          this.uc = dato['uc']
          this.utumd = dato['ut/umd']
          this.uh = dato['uh']
          this.up = dato['up']
          this.uph = dato['uph']
          this.upv = dato['upv']
          this.uphv = dato['uphv']
          console.log('Zona:', this.zona);
          
          // Aquí puedes hacer lo que necesites con los datos
          return data; // Opcional: Puedes devolver los datos si los necesitas en otro lugar
        }),
        catchError(error => {
          console.error('Error al cargar los datos:', error);
          throw error; // Opcional: Puedes relanzar el error si quieres manejarlo más adelante
        })
      ).subscribe();
    }
    
    getLocalidades() {
      this.consulta.collection('localidades').snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          }).sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar alfabéticamente por el nombre
        })
      ).subscribe(localidades => {
        this.localidades = localidades;
        // No es necesario llamar a filterLocalidades() aquí
      });
    }

    onSearch(event: any) {
      const textoBusqueda: string = event?.detail?.value || '';
      this.filterLocalidades(textoBusqueda);
    }

    selectLocalidad(localidad: any) {
      // Establecer la localidad seleccionada
      this.selectedCity = localidad;
      this.textoBusqueda = localidad.nombre;
      // Ocultar la lista de localidades
      this.showLocalidades = false;
    }
    filterLocalidades(textoBusqueda: string = '') {
      if (textoBusqueda === '') {
        // No hay texto de búsqueda, mostrar todas las localidades
        this.localidadesFiltradas = this.localidades;
      } else {
        // Aplicar filtro para mostrar solo las localidades que coinciden con el texto de búsqueda
        this.localidadesFiltradas = this.localidades.filter(localidad =>
          localidad.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
        );
      }
      this.showLocalidades = true;
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

    async confirmarAddProyecto(proyecto:ProyectosInterfaz, guardar:boolean) {
      
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Está seguro de que desea crear el proyecto?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              
            }
          }, {
            text: 'Añadir',
            handler: () => {
              guardar = true
              this.climaService.setProyecto(proyecto)
              this.alertProyectoCreado()
              console.log('Proyecto añadido a la base de datos');
             
            }
          }
        ]
      });
  
      await alert.present();
    }

   
    validarProyecto(proyecto: ProyectosInterfaz, guardar:boolean): void {
      for (const campo in proyecto) {
          if (proyecto.hasOwnProperty(campo) && !proyecto[campo as keyof ProyectosInterfaz]) {
            const clave = campo
            this.campoVacioAlerta(clave)
              return;
          }
      }
      this.confirmarAddProyecto(proyecto, guardar)
  }
  
  
    async campoVacioAlerta(campo:any) {
      const alerta = await this.alertController.create({
        header: 'Campo Vacío',
        message: 'El campo: '+campo+ ' está vacio, por favor ingrese un valor',
        buttons: ['OK']
      });
  
      await alerta.present();
    }

    async alertProyectoCreado() {
      const alerta = await this.alertController.create({
        header: 'Proyecto creado correctamente',
        message: 'El proyecto se ha añadido a la base de datos',
        buttons: ['OK']
      });
      this.router.navigate(['./proyectos'])
      await alerta.present();
    }

}

