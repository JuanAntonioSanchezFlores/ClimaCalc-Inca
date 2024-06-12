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
  selector: 'app-actualizar-proyecto',
  templateUrl: './actualizar-proyecto.page.html',
  styleUrls: ['./actualizar-proyecto.page.scss'],
})
export class ActualizarProyectoPage implements OnInit {

  proyecto:any = {}
  date:any = new Date()
  fecha:any = this.date
  titulo:any = ""
  proyectista: any = ''
  cliente:any = ''
  observaciones:any = ''
  selectedCity:any 
  altitud:any = 100
  selectedZone:any = ''
  zonaClimatica:any = ''
  t_exteriorV:any = 100
  t_exteriorI:any = 100
  h_relativaV: any = 100
  h_relativaI:any = 100
  h_relativaVerano!:any
  h_relativaInvierno!:any
  oda:any = ''

  nombreLocalidad:string = ''
  localidadIndex:any = 0



  email:string = ''
 
  actualizar:boolean = false
  id:string = ''
  zonasClimaticas:any;
  zonaKeys: string[] = [];
  localidades: any[] = []
  

  filteredLocalidades: any[] = [];
  searchTerm: string = ''
  
 
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
  odaSeleccionada:string = ''

  @ViewChild('ciudadSeleccionada') ciudadSeleccionada!: IonSelect;
  @ViewChild('altitud') altitudHtml!: IonInput
  @ViewChild('temp_exteriorV') temp_exteriorV!: IonInput;
  @ViewChild('temp_exteriorI') temp_exteriorI!: IonInput;
  @ViewChild('h_relativaV') h_relativaVHtml!: IonInput;
  @ViewChild('h_relativaI') h_relativaIHtml!: IonInput;
  @ViewChild('temp_suelo_V') temp_suelo_VHtml!: IonInput;
  @ViewChild('temp_suelo_I') temp_suelo_IHtml!: IonInput;
  @ViewChild('selectedZone') selectedZoneHtml!: IonSelect;
  @ViewChild('usumHtml') usumHtml!: IonInput;
  @ViewChild('ucHtml') ucHtml!: IonInput;
  @ViewChild('utumdHtml') utumdHtml!: IonInput;
  @ViewChild('umdHtml') umdHtml!: IonInput;
  @ViewChild('uhHtml') uhHtml!: IonInput;
  @ViewChild('upHtml') upHtml!: IonInput;
  @ViewChild('uphHtml') uphHtml!: IonInput;
  @ViewChild('upvHtml') upvHtml!: IonInput;
  @ViewChild('uphvHtml') uphvHtml!: IonInput;
  @ViewChild('oda') odaHtml!: IonSelect;
  

  constructor(private router:Router, private consulta:AngularFirestore, private alertController:AlertController,
    private paramRuta:ActivatedRoute, private componente: AppComponent,
    public globalService: GlobalService, private  climaService: ClimaServiceService) 
    {
      
    }

    mostrarDatosProyecto(){
      this.fecha = this.proyecto.fecha
      this.titulo =  this.proyecto.titulo
      this.proyectista = this.proyecto.proyectista
      this.cliente = this.proyecto.cliente
      this.observaciones = this.proyecto.observaciones
      this.ciudadSeleccionada = this.proyecto.ciudad
      this.altitudHtml =  this.proyecto.altitud
      this.selectedZoneHtml = this.proyecto.zona
      this.t_exteriorV = this.proyecto.temp_ext_ver
      this.t_exteriorI =  this.proyecto.temp_ext_inv
      this.h_relativaVHtml =  this.proyecto.hr_ext_ver
      this.h_relativaIHtml =  this.proyecto.hr_ext_inv
      this.temp_suelo_VHtml = this.proyecto.temp_suelo_V
      this.temp_suelo_IHtml = this.proyecto.temp_suelo_I
      this.usumHtml = this.proyecto.usum
      this.ucHtml = this.proyecto.uc
      this.utumdHtml = this.proyecto.utumd
      this.umdHtml = this.proyecto.umd
      this.uhHtml = this.proyecto.uh
      this.upHtml =  this.proyecto.up
      this.uphHtml = this.proyecto.uph
      this.upvHtml = this.proyecto.upv
      this.uphvHtml = this.proyecto.uphv
      this.odaHtml = this.proyecto.odaSeleccionada
      
    }
   
        

    
    ngOnInit() {

      this.getLocalidades()

     if (!this.selectedCity ) {
        this.selectedCity = { temp_ext_inv: null, temp_ext_ver: null };//Pone a null estos campos si no hay seleccinado
      }

      this.observeCambioZona()

      this.paramRuta.params.subscribe(params => {
        this.email = this.globalService.usuarioRegistrado
        this.id = this.globalService.id
      })
      
     
      const idProyecto = this.id;
      this.obtenerDocumentoPorId(idProyecto, this.proyecto);//Obtiene la id y los datos del proyecto
     this.mostrarDatosProyecto()
    }
    
    actualizarProyecto() {
      const proyecto = {
        fecha: this.fecha,
        titulo: this.titulo, 
        proyectista: this.proyectista,
        cliente: this.cliente,
        observaciones: this.observaciones,
        ciudad: this.selectedCity.nombre,
        altitud: this.altitud,
        zonaClimatica: this.zona,
        t_exteriorV: this.t_exteriorV,
        t_exteriorI: this.t_exteriorI,
        h_relativaV: this.h_relativaV,
        h_relativaI: this.h_relativaI,
        
        usum: this.usum,
        uc: this.uc,
        utumd: this.utumd,
        uh: this.uh,
        up: this.up,
        uph: this.uph,
        upv: this.upv,
        uphv: this.uphv,
        oda:this.odaSeleccionada
      };
  
      // Asigna el objeto proyecto a this.proyecto
      this.proyecto = proyecto;
      this.climaService.updateProyecto(this.proyecto, this.id)
    }
    async obtenerDocumentoPorId(id: string, proyecto: any) {
      console.log("id:" + id);
      // Obtener el documento y sus datos
      this.consulta.collection('proyectos').doc(id)
        .valueChanges()
        .pipe(
          map((doc: any) => {
            if (doc) {
              console.log("datos proyecto: ", doc);
              Object.assign(proyecto, doc);
              this.datosProyecto(proyecto);
            } else {
              console.log("El documento con el ID", id, "no existe en la colección 'proyectos'.");
            }
          })
        )
        .subscribe();
    }
    
    datosProyecto(proyecto:any){
      
      this.buscarIndiceLocalidadPorNombre(proyecto.ciudad)
      //this.observeCambioZona()
      this.fecha = proyecto.fecha
      this.titulo = proyecto.titulo
      this.proyectista = proyecto.proyectista
      this.cliente = proyecto.cliente 
      this.observaciones = proyecto.observaciones 
      this.selectedCity = this.localidades[this.localidadIndex]
      this.altitud = proyecto.altitud 
      this.zonaClimatica = this.selectedZone
      this.t_exteriorV= proyecto.t_exteriorV, 
      this.t_exteriorI= proyecto.t_exteriorI,
      this.h_relativaV = proyecto.h_relativaV
      this.h_relativaI = proyecto.h_relativaI

      this.usum = proyecto.usum,
      this.uc = proyecto.uc, 
      this.utumd = proyecto.umd,
      this.uh= proyecto.uh,
      this.up= proyecto.up,
      this.uph = proyecto.tph,
      this.upv = proyecto.tpv,
      this.uphv = proyecto.tphv
      this.odaSeleccionada =proyecto.oda
    }

    buscarIndiceLocalidadPorNombre(nombreCiudad: string) {
      const indice = this.localidades.findIndex(localidad => localidad.nombre === nombreCiudad);
      console.log("índice:", indice);
      if(indice != undefined){
        this.localidadIndex = indice ;
      }
        
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
  
    guardarDatos(){
      console.log("zonas:"+ this.selectedCity['zona climatica'])
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
          console.log('us/um:', dato);
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
          });
        })
      ).subscribe(localidades => {
        this.localidades = localidades;
        this.filterLocalidades();
      });
    }

  filterLocalidades() {
    this.filteredLocalidades = this.localidades.filter(localidad =>
      localidad.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectLocalidad(localidad: any) {
    console.log('Localidad seleccionada:', localidad);
    // Aquí puedes realizar la acción que desees al seleccionar una localidad
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

}
