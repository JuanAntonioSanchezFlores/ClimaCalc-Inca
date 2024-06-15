import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { ActivatedRoute } from '@angular/router';
import { ClimaServiceService } from '../clima-service.service';
import { HttpClient } from '@angular/common/http';
import { RecintosInterfaz } from '../recintos-interfaz';
import { ProyectosInterfaz } from '../proyectos-interfaz';
import { IonInput, IonRadio, IonRadioGroup, IonSelect } from '@ionic/angular';
import { ListaEquiposService } from '../lista-equipos.service';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-camaras',
  templateUrl: './camaras.page.html',
  styleUrls: ['./camaras.page.scss'],
})
export class CamarasPage implements OnInit {

  
  //CONSTANTES
  //Temperatura y humedad relativa del recinto

  proyectoTitulo: string = ''
  variableGlobal: string = ''
  id: string = ''
  idRe!: number

  nombreRecint:string = ''

  temp_int_ver: number = 25
  temp_int_inv: number = 21
  hr_int_ver: number = 50
  hr_int_inv: number = 50

  recintoIniciado: boolean = false
  recintoIniciado1: boolean = false
  recintoIniciado2: boolean = false
  recintoIniciado3: boolean = false

  cargaTermica!: string
  temperaturaVerano: number = 25
  temperaturaInvierno: number = 21
  hrVerano: number = 10
  hrInvierno: number = 10

  nivelFiltracionRequerido: string="ida3"
  filtro: string = 'f5+f7'
  longitud: number = 10
  anchura: number = 5
  altura: number = 3
  calcVolumen: number = 75
  orientacionCerramiento1: string = 'Norte'
 
  tCerVer: number = 25
  tCerVer1: number = 25
  tCerVer2: number = 25
  tCerVer3: number = 25

  tCerInv: number = 21
  tCerInv1: number = 21
  tCerInv2: number = 21
  tCerInv3: number = 21

  supCerra: number = this.longitud * this.altura
  supCerra1: number = this.anchura * this.altura
  supCerra2: number = this.longitud * this.altura
  supCerra3: number = this.anchura * this.altura

  cerramiento1Exterior: string = 'Interior'
  cerramiento1Exterior1: string = 'Interior'
  cerramiento1Exterior2: string = 'Interior'
  cerramiento1Exterior3: string = 'Interior'

  //colorSuperficie1!:string
  contienVidrios: boolean = false
  vidrioSeleccionado1: string = 'No'
  vidrioSeleccionado2: string = 'No'
  vidrioSeleccionado3: string = 'No'
  vidrioSeleccionado4: string = 'No'

  superficieVidrios: number = 0
  superficieVidrios1: number = 0
  superficieVidrios2: number = 0
  superficieVidrios3: number = 0
  superficieVidrios4: number = 0

  tipoVidrio: string = 'No contiene vidrio'
  tipoVidrio1: string = 'No contiene vidrio'
  tipoVidrio2: string = 'No contiene vidrio'
  tipoVidrio3: string = 'No contiene vidrio'
  tipoVidrio4: string = 'No contiene vidrio'
  tipoVidrioValor: number = 0
  tipoVidrioValor1: number = 0
  tipoVidrioValor2: number = 0
  tipoVidrioValor3: number = 0
  tipoVidrioValor4: number = 0

  contienePuertas: boolean = false
  superficiePuertas: number = 0
  superficiePuertas1: number = 0
  superficiePuertas2: number = 0
  superficiePuertas3: number = 0
  superficiePuertas4: number = 0


  colSupVisible: boolean = true
  colSupVisible1: boolean = true
  colSupVisible2: boolean = true
  colSupVisible3: boolean = true

  colorCerramiento1: string = 'No necesario'
  colorCerramiento2: string = 'No necesario'
  colorCerramiento3: string = 'No necesario'
  colorCerramiento4: string = 'No necesario'
  colorCerramientoCubierta: string = 'No necesario'

  vidrioDesabilitado: boolean = true
  vidrioDesabilitado1: boolean = true
  vidrioDesabilitado2: boolean = true
  vidrioDesabilitado3: boolean = true
  vidrioDesabilitado4: boolean = true

  superfiPuertas: boolean = true
  superfiPuertas1: boolean = true
  superfiPuertas2: boolean = true
  superfiPuertas3: boolean = true
  superfiPuertas4: boolean = true

  cubiertaDesabilitada: boolean = true

  vistaRecintos: boolean = false
  vistaCrearRecinto: boolean = true

  puertasVisible: string = 'No'
  puertasVisible1: string = 'No'
  puertasVisible2: string = 'No'
  puertasVisible3: string = 'No'
  puertasVisible4: string = 'No'


  vidrioSeleccionado: string = 'No'
  orientacionTechoString: string = 'Norte'
  orientacionTecho: string = 'Norte'
  tempTechoVer: number = 25
  tempTechoInv: number = 21
  supTecho!: number
  supSuelo!: number

  cubiertaSeleccionada: string = 'Interior'

  sueloSeleccionado: string = 'Interior'
  numePersonas!: number
  cargSensible!: number
  cargLatente!: number
  caudalIda: number = 8
  aireRenovacion: number
  lamparaSeleccionada: string = 'Led'
  potenciaIluminacion: number = 20
  factorSeguridad: number = 10
  proyecto: any
  recintos: any

  // Coordenadas
  coor1Visible: boolean = true
  coor2Visible: boolean = true
  coor3Visible: boolean = true
  coor4Visible: boolean = true

  nDesabilitado: boolean = false
  eDesabilitado: boolean = false
  oDesabilitado: boolean = false
  sDesabilitado: boolean = false

  colorCerrSeleccionado!: string


  listaParamCerramiento1: any[] = ['Norte', 'Interior', 'No necesario', 'No', 0, 'No necesario', 'No', 25, 20, 15]
  listaParamCerramiento2: any[] = ['Oeste', 'Interior', 'No necesario', 'No', 0, 'No necesario', 'No', 25, 20, 15]
  listaParamCerramiento3: any[] = ['Sur', 'Interior', 'No necesario', 'No', 0, 'No necesario', 'No', 25, 20, 15]
  listaParamCerramiento4: any[] = ['Este', 'Interior', 'No necesario', 'No', 0, 'No necesario', 'No', 25, 20, 15]

  equipos: { nombre: string, potencia: number, factorFuncionamiento: number }[] = [];

  valorCoor1: number = 38
  valorCoor2: number = 556
  valorCoor3: number = 49
  valorCoor4: number = 32
  valorCoor5: number = 38

  tempSueloVer: any = this.temp_int_ver
  tempSueloInv: any = this.temp_int_inv
  activity: string = 'Sedentaria'
  valorActividad: any
  iluminacion: any
  valorIluminacion!: number
  nombreEquipo: any = "Ordenador"
  potenciaEquipo: any = 500
  factorEquipo: any = 1

  recintosCard:boolean = false
  datosRecinto:boolean = true


  /**** RESULTADOS*********** */
  cargaSensibleRadiacionVidrio: number = 0
  cargaSensibleCerramientos: number = 0
  cargaSensibleAire: number = 0
  cargaSensibleOcupacion: number = 0
  cargaSensibleIluminacion: number = 0
  cargaSensibleEquipamiento: number = 0
  cargaTotalSensibleRefrigeracion: number = 0
  cargaLatenteAire: number = 0
  cargaLatenteOcupacion: number = 0
  cargaTotalLatenteRefrigeracion = 0
  potenciaRefrigeracion: number = 0
  cargaSensibleCerramientosInv: number = 0
  cargaSensibleAireInv: number = 0
  cargaTotalSensibleCalefaccion: number = 0
  potenciaCalefaccion: number = 0

  cargaSensibleRadiacionVidrioF: string = ''
  cargaSensibleCerramientosF: string = ''
  cargaSensibleAireF:string = ''
  cargaSensibleOcupacionF: string = ''
  cargaSensibleIluminacionF: string = ''
  cargaSensibleEquipamientoF: string = ''
  cargaTotalSensibleRefrigeracionF: string = ''
  cargaLatenteAireF: string = ''
  cargaLatenteOcupacionF: string = ''
  cargaTotalLatenteRefrigeracionF:string = ''
  potenciaRefrigeracionF: string = ''
  cargaSensibleCerramientosInvF: string = ''
  cargaSensibleAireInvF: string = ''
  cargaTotalSensibleCalefaccionF: string = ''
  potenciaCalefaccionF: string = ''

  verResultados: boolean = true
  potenciaRefrigeracionEdif:number = 0
  potenciaCalefaccionEdif:number = 0

  @ViewChild('recintoId') recintoId: any;
  @ViewChild('nombreRecinto') nombreRecinto!: IonInput;
  @ViewChild('temp_verano') temp_verano!: HTMLInputElement;
  @ViewChild('temp_invierno') temp_invierno!: HTMLInputElement;
  @ViewChild('hr_verano') hr_verano!: HTMLInputElement;
  @ViewChild('hr_invierno') hr_invierno!: HTMLInputElement;
  @ViewChild('ida') ida!: IonSelect;
  @ViewChild('nivelFiltro') nivelFiltro!: HTMLInputElement;
  @ViewChild('largo') largo!: HTMLInputElement;
  @ViewChild('ancho') ancho!: HTMLInputElement;
  @ViewChild('alto') alto!: HTMLInputElement;
  @ViewChild('volumen') volumen!: HTMLInputElement;
  @ViewChild('orientCerramiento') orientCerramiento!: IonRadioGroup;
  @ViewChild('cerram1') cerram1!: IonRadioGroup;
  @ViewChild('colorCerr1') colorCerr1!: IonSelect;
  @ViewChild('colorCerr2') colorCerr2!: IonSelect;
  @ViewChild('colorCerr3') colorCerr3!: IonSelect;
  @ViewChild('colorCerr4') colorCerr4!: IonSelect;
  @ViewChild('tempCerVer') tempCerVer!: HTMLInputElement;
  @ViewChild('tempCerVer1') tempCerVer1!: HTMLInputElement;
  @ViewChild('tempCerVer2') tempCerVer2!: HTMLInputElement;
  @ViewChild('tempCerVer3') tempCerVer3!: HTMLInputElement;
  @ViewChild('tempCerInv') tempCerInv!: HTMLInputElement;
  @ViewChild('tempCerInv1') tempCerInv1!: HTMLInputElement;
  @ViewChild('tempCerInv2') tempCerInv2!: HTMLInputElement;
  @ViewChild('tempCerInv3') tempCerInv3!: HTMLInputElement;
  @ViewChild('supCerramiento') supCerramiento!: HTMLInputElement;
  @ViewChild('supCerramiento1') supCerramiento1!: HTMLInputElement;
  @ViewChild('supCerramiento2') supCerramiento2!: HTMLInputElement;
  @ViewChild('supCerramiento3') supCerramiento3!: HTMLInputElement;
  @ViewChild('ventanas') ventanas!: IonRadioGroup;
  @ViewChild('ventanas1') ventanas1!: IonRadioGroup;
  @ViewChild('ventanas2') ventanas2!: IonRadioGroup;
  @ViewChild('ventanas3') ventanas3!: IonRadioGroup;
  @ViewChild('ventanas4') ventanas4!: IonRadioGroup;
  @ViewChild('supVidrio') supVidrio!: HTMLInputElement;
  @ViewChild('supVidrio1') supVidrio1!: HTMLInputElement;
  @ViewChild('supVidri2') supVidrio2!: HTMLInputElement;
  @ViewChild('supVidrio3') supVidrio3!: HTMLInputElement;
  @ViewChild('supVidrio4') supVidrio4!: HTMLInputElement;
  @ViewChild('tipVidrio') tipVidrio!: IonSelect;
  @ViewChild('tipVidrio1') tipVidrio1!: IonSelect;
  @ViewChild('tipVidrio2') tipVidrio2!: IonSelect;
  @ViewChild('tipVidrio3') tipVidrio3!: IonSelect;
  @ViewChild('tipVidrio4') tipVidrio4!: IonSelect;
  @ViewChild('puertas') puertas!: IonRadioGroup;
  @ViewChild('puertas1') puertas1!: IonRadioGroup;
  @ViewChild('puertas2') puertas2!: IonRadioGroup;
  @ViewChild('puertas3') puertas3!: IonRadioGroup;
  @ViewChild('puertas4') puertas4!: IonRadioGroup;
  @ViewChild('supPuertas') supPuertas!: HTMLInputElement;
  @ViewChild('supPuertas1') supPuertas1!: HTMLInputElement;
  @ViewChild('supPuertas2') supPuertas2!: HTMLInputElement;
  @ViewChild('supPuertas3') supPuertas3!: HTMLInputElement;
  @ViewChild('supPuertas4') supPuertas4!: HTMLInputElement;
  @ViewChild('cubierta') cubierta!: IonRadioGroup;
  @ViewChild('colorCubierta') colorCubierta!: IonSelect;
  @ViewChild('tempeTechoVer') tempeTechoVer!: HTMLInputElement;
  @ViewChild('tempeTechoInv') tempeTechoInv!: HTMLInputElement;
  @ViewChild('supeTecho') supeTecho!: HTMLInputElement;
  @ViewChild('suelo') suelo!: IonRadioGroup;
  @ViewChild('actividad') actividad!: IonRadioGroup;
  @ViewChild('numPersonas') numPersonas!: HTMLInputElement;
  @ViewChild('cargaSensible') cargaSensible!: HTMLInputElement;
  @ViewChild('cargaLatente') cargaLatente!: HTMLInputElement;
  @ViewChild('caudaIda') caudaIda!: HTMLInputElement;
  @ViewChild('airRenovacion') airRenovacion!: HTMLInputElement;
  @ViewChild('lampara') lampara!: IonRadioGroup;
  @ViewChild('potIluminacion') potIluminacion!: HTMLInputElement;
  @ViewChild('mayoracion') mayoracion!: HTMLInputElement;

  presion: any
  p_sat_agua_ext_ver: any
  hum_absol_ext_ver: any
  entalpia_ext_ver_sens: any
  entalpia_ext_ver_lat: any
  volum_espe_ext_ver: any
  p_sat_agua_ext_inv: any
  hum_absol_ext_inv: any
  entalpia_ext_inv_sens: any
  entalpia_ext_inv_lat: any
  volum_espe_ext_inv: any

  p_sat_agua_int_ver: any
  hum_absol_int_ver: any
  entalpia_int_ver_sens: any
  entalpia_int_ver_lat: any
  volum_espe_int_ver: any
  p_sat_agua_int_inv: any
  hum_absol_int_inv: any
  entalpia_int_inv_sens: any
  entalpia_int_inv_lat: any
  volum_espe_int_inv: any
  

  constructor(private globalService: GlobalService, private paramRuta: ActivatedRoute, private consulta: ClimaServiceService,
    private leeJson: HttpClient, private climaService: ClimaServiceService, private equiposList: ListaEquiposService, private alerta:AlertController
  ) {
    this.supTecho = this.longitud * this.altura
    this.supSuelo = this.longitud * this.altura
    this.numePersonas = this.longitud * this.altura / 2
    this.cargSensible = this.longitud * this.altura / 2 * 70
    this.cargLatente = this.longitud * this.altura / 2 * 50
    this.aireRenovacion = this.longitud * this.altura / 2 * this.caudalIda * 3.6
  }

  
  pruebas() {
    console.log("lista 1 ", this.listaParamCerramiento1)
    console.log("lista 2 ", this.listaParamCerramiento2)
    console.log("lista 3 ", this.listaParamCerramiento3)
    console.log("lista 4 ", this.listaParamCerramiento4)
  }


  ngOnInit() {
    this.paramRuta.params.subscribe(params => {
      this.globalService.proyectoTitulo = params['proyectoTitulo'],
        this.globalService.id = params['id']
        this.proyectoTitulo = this.globalService.proyectoTitulo
        this.id = this.globalService.id
    });
    this.proyectoActual()
    this.setSupCerramiento()
    this.vistaRecintos = false
  }

  calculoPorcentaje(numero:number){

  }

  guardarRecinto(){
    if(this.nombreRecint == '' || undefined || null){
      this.alertaCampoNombre()
    }
  }

  async alertaCampoNombre() {
    const alert = await this.alerta.create({
      header: 'Campo vacío',
      message: 'El campo "Nombre del recinto" está vacío. Por favor, introduzca un nombre.',
      buttons: ['OK']
    });

    await alert.present();
  }


  mostrarDatosRecinto(){
   this.datosRecinto = false
  }

  async exitoAddEquipo() {
    const alert = await this.alerta.create({
      header: 'Éxito',
      message: 'Equipo añadido correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  getIdRe() {
    const recintos = this.proyecto.recintos.length
    this.idRe = recintos + 1
    console.log(this.idRe)
  }

  addEquipo(nombre: string, potencia: number, factorFuncionamiento: number) {
    this.equiposList.agregarEquipo(nombre, potencia, factorFuncionamiento)
    console.log(this.equiposList.listaEquipos)
    this.exitoAddEquipo()
  }

  getCargaEquipo() {
    let resultadoTotal = 0
    this.equipos = this.equiposList.obtenerEquipos()
    for (let equipo of this.equipos) {
      // Aquí puedes realizar tu lógica o fórmula utilizando los datos del equipo
      let resultado = (equipo.potencia * equipo.factorFuncionamiento / 100) + equipo.potencia;
      console.log("REsultado: ", resultado)
      resultadoTotal = resultadoTotal + resultado;
    }
    console.log('Resultado:', resultadoTotal);
    return resultadoTotal
  }

  getIluminacion() {
    if (this.lamparaSeleccionada == 'Led') {
      this.valorIluminacion = 4
      this.potenciaIluminacion = this.valorIluminacion
    }
    if (this.lamparaSeleccionada == 'Fluorescente') {
      this.valorIluminacion = 20
      this.potenciaIluminacion = this.valorIluminacion
    }
  }

  getValorActividad() {
    if (this.activity == 'Sedentaria') {
      this.cargSensible = 70 * this.longitud * this.anchura / 2
      this.cargLatente = 50 * this.longitud * this.anchura / 2
    }
    if (this.activity == 'Activa') {
      this.cargSensible = 150 * this.longitud * this.anchura / 2
      this.cargLatente = 300 * this.longitud * this.anchura / 2
    }
  }

  setSupCerramiento() {
    this.supCerra = this.longitud * this.altura
    this.listaParamCerramiento1[10] = this.supCerra
    this.supCerra1 = this.anchura * this.altura
    this.listaParamCerramiento2[10] = this.supCerra1
    this.supCerra2 = this.longitud * this.altura
    this.listaParamCerramiento3[10] = this.supCerra2
    this.supCerra3 = this.anchura * this.altura
    this.listaParamCerramiento4[10] = this.supCerra3
    this.supTecho = this.anchura * this.longitud
    this.supSuelo = this.anchura * this.longitud
    this.numePersonas = this.longitud * this.anchura / 2
    this.getValorActividad()
  }

  getTempCerrInv(name: any) {
    switch (name) {
      case 'coor1':
        this.listaParamCerramiento1[10] = this.tCerInv
        break
      case 'coor2':
        this.listaParamCerramiento2[10] = this.tCerInv1
        break
      case 'coor3':
        this.listaParamCerramiento3[10] = this.tCerInv2
        break
      case 'coor4':
        this.listaParamCerramiento4[10] = this.tCerInv3
        break
    }
  }

  getTempCerrVer(name: any) {
    switch (name) {
      case 'coor1':
        this.listaParamCerramiento1[9] = this.tCerVer
        break
      case 'coor2':
        this.listaParamCerramiento2[9] = this.tCerVer1
        break
      case 'coor3':
        this.listaParamCerramiento3[9] = this.tCerVer2
        break
      case 'coor4':
        this.listaParamCerramiento4[9] = this.tCerVer3
        break
    }
  }

  getSupVidrio(name: any) {
    switch (name) {
      case 'coor1':
        this.listaParamCerramiento1[4] = this.superficieVidrios
        break
      case 'coor2':
        this.listaParamCerramiento2[4] = this.superficieVidrios1
        break
      case 'coor3':
        this.listaParamCerramiento3[4] = this.superficieVidrios2
        break
      case 'coor4':
        this.listaParamCerramiento4[4] = this.superficieVidrios3
        break
    }
  }

  getSupPuertas(name: any) {
    switch (name) {
      case 'coor1':
        this.listaParamCerramiento1[7] = this.superficiePuertas
        break
      case 'coor2':
        this.listaParamCerramiento2[7] = this.superficiePuertas1
        break
      case 'coor3':
        this.listaParamCerramiento3[7] = this.superficiePuertas2
        break
      case 'coor4':
        this.listaParamCerramiento4[7] = this.superficiePuertas3
        break
    }


  }

  getTipVidrio(name: any) {
    switch (name) {
      case 'coor1':
        this.listaParamCerramiento1[5] = this.tipVidrio.value
        if (this.tipVidrio.value == 'normal') {
          this.tipoVidrioValor = 1
        }
        if (this.tipVidrio.value == 'doble') {
          this.tipoVidrioValor = 0.8
        }
        if (this.tipVidrio.value == 'triple') {
          this.tipoVidrioValor = 0.7
        }
        if (this.tipVidrio.value == 'baja emisividad') {
          this.tipoVidrioValor = 0.1
        }
        break
      case 'coor2':
        this.listaParamCerramiento2[5] = this.tipVidrio1.value
        if (this.tipVidrio1.value == 'normal') {
          this.tipoVidrioValor1 = 1
        }
        if (this.tipVidrio1.value == 'doble') {
          this.tipoVidrioValor1 = 0.8
        }
        if (this.tipVidrio1.value == 'triple') {
          this.tipoVidrioValor1 = 0.7
        }
        if (this.tipVidrio1.value == 'baja emisividad') {
          this.tipoVidrioValor1 = 0.1
        }
        break
      case 'coor3':
        this.listaParamCerramiento3[5] = this.tipVidrio2.value
        if (this.tipVidrio2.value == 'normal') {
          this.tipoVidrioValor2 = 1
        }
        if (this.tipVidrio2.value == 'doble') {
          this.tipoVidrioValor2 = 0.8
        }
        if (this.tipVidrio2.value == 'triple') {
          this.tipoVidrioValor2 = 0.7
        }
        if (this.tipVidrio2.value == 'baja emisividad') {
          this.tipoVidrioValor2 = 0.1
        }
        break
      case 'coor4':
        this.listaParamCerramiento4[5] = this.tipVidrio3.value
        if (this.tipVidrio3.value == 'normal') {
          this.tipoVidrioValor3 = 1
        }
        if (this.tipVidrio3.value == 'doble') {
          this.tipoVidrioValor3 = 0.8
        }
        if (this.tipVidrio3.value == 'triple') {
          this.tipoVidrioValor3 = 0.7  
        }
        if (this.tipVidrio3.value == 'baja emisividad') {
          this.tipoVidrioValor3 = 0.1
        }
        break
      case 'coor5':
        if (this.tipVidrio4.value == 'normal') {
          this.tipoVidrioValor4 = 1
        }
        if (this.tipVidrio4.value == 'doble') {
          this.tipoVidrioValor4 = 0.8
        }
        if (this.tipVidrio4.value == 'triple') {
          this.tipoVidrioValor4 = 0.7
        }
        if (this.tipVidrio4.value == 'baja emisividad') {
          this.tipoVidrioValor4 = 0.1
        }
        break
    }
  }

  seleccionCoordenadaN() {
    this.listaParamCerramiento1[0] = 'Norte'
    this.valorCoor1 = 38
    this.listaParamCerramiento2[0] = 'Oeste'
    this.valorCoor2 = 556
    this.listaParamCerramiento3[0] = 'Sur'
    this.valorCoor3 = 49
    this.listaParamCerramiento4[0] = 'Este'
    this.valorCoor4 = 32

  }

  seleccionCoordenadaO() {
    this.listaParamCerramiento1[0] = 'Oeste'
    this.valorCoor1 = 556
    this.listaParamCerramiento2[0] = 'Norte'
    this.valorCoor2 = 38
    this.listaParamCerramiento3[0] = 'Sur'
    this.valorCoor3 = 49
    this.listaParamCerramiento4[0] = 'Este'
    this.valorCoor4 = 32


  }

  seleccionCoordenadaE() {
    this.listaParamCerramiento1[0] = 'Este'
    this.valorCoor1 = 32
    this.listaParamCerramiento2[0] = 'Oeste'
    this.valorCoor2 = 556
    this.listaParamCerramiento3[0] = 'Sur'
    this.valorCoor2 = 49
    this.listaParamCerramiento4[0] = 'Norte'
    this.valorCoor1 = 38

  }

  seleccionCoordenadaS() {
    this.listaParamCerramiento1[0] = 'Sur'
    this.valorCoor1 = 49
    this.listaParamCerramiento2[0] = 'Oeste'
    this.valorCoor2 = 556
    this.listaParamCerramiento3[0] = 'Norte'
    this.valorCoor3 = 38
    this.listaParamCerramiento4[0] = 'Este'
    this.valorCoor4 = 32

  }

  private getDivId(event: Event): string {
    const targetElement = event.target as HTMLElement;
    const divElement = targetElement.closest('div'); // Encuentra el div más cercano
    return divElement ? divElement.id : '';
  }

  crearRecinto() {
    this.vistaRecintos = true
    this.vistaCrearRecinto = false
  }

  verCerramiento1() {
    this.coor1Visible = false
    this.coor2Visible = true
    this.coor3Visible = true
    this.coor4Visible = true


    if (this.recintoIniciado) {
      if (this.colorCerr1.value != 'Seleccione color') {
        this.colorCerr1.value = this.colorCerr1.value
      } else {
        this.colorCerr1.value = ""
      }

      if (this.ventanas.value != "") {
        this.ventanas.value = this.ventanas.value
      } else {
        this.ventanas.value = ""
      }

      if (this.vidrioSeleccionado != "") {
        this.vidrioSeleccionado = this.vidrioSeleccionado
      } else {
        this.superficieVidrios = 0
        this.vidrioDesabilitado = true
      }

      if (this.puertasVisible != "") {
        this.puertasVisible = this.puertasVisible
      } else {
        this.puertasVisible = ""
      }
      this.recintoIniciado = true
    }


  }

  verCerramiento2() {
    this.coor1Visible = true
    this.coor2Visible = false
    this.coor3Visible = true
    this.coor4Visible = true

    if (this.recintoIniciado1) {
      if (this.colorCerr2.value != 'Seleccione color') {
        this.colorCerr2.value = 'Seleccione color'
      } else {
        this.colorCerr2.value = ""
      }

      if (this.ventanas1.value != "") {
        this.ventanas1.value = ""
      } else {
        this.ventanas1.value = this.ventanas1.value
      }

      if (this.vidrioSeleccionado1 != "") {
        this.vidrioSeleccionado1 = this.vidrioSeleccionado1
      } else {
        this.superficieVidrios1 = 0
        this.vidrioDesabilitado = true
      }

      if (this.puertasVisible1 != "") {
        this.puertasVisible1 = this.puertasVisible1
      } else {
        this.puertasVisible1 = ""
      }

      this.recintoIniciado1 = true
    }


  }
  verCerramiento3() {
    this.coor1Visible = true
    this.coor2Visible = true
    this.coor3Visible = false
    this.coor4Visible = true

    if (this.recintoIniciado2) {
      if (this.colorCerr3.value != 'Seleccione color') {
        this.colorCerr3.value = this.colorCerr3.value
      } else {
        this.colorCerr3.value = ""
      }

      if (this.ventanas2.value != "") {
        this.ventanas2.value = this.ventanas2.value
      } else {
        this.ventanas2.value = ""
      }

      if (this.vidrioSeleccionado2 != "") {
        this.vidrioSeleccionado2 = this.vidrioSeleccionado2
      } else {
        this.superficieVidrios2 = 0
        this.vidrioDesabilitado = true
      }

      if (this.puertasVisible2 != "") {
        this.puertasVisible2 = this.puertasVisible2
      } else {
        this.puertasVisible2 = ""
      }
    }
    this.recintoIniciado2 = true

  }

  verCerramiento4() {
    this.coor1Visible = true
    this.coor2Visible = true
    this.coor3Visible = true
    this.coor4Visible = false

    if (this.recintoIniciado3) {
      if (this.colorCerr4.value != 'Seleccione color') {
        this.colorCerr4.value = this.colorCerr4.value
      } else {
        this.colorCerr4.value = ""
      }

      if (this.ventanas3.value != "") {
        this.ventanas3.value = this.ventanas3.value
      } else {
        this.ventanas3.value = ""
      }

      if (this.vidrioSeleccionado3 != "") {
        this.vidrioSeleccionado3 = this.vidrioSeleccionado3
      } else {
        this.superficieVidrios3 = 0
        this.vidrioDesabilitado = true
      }
      if (this.puertasVisible3 != "") {
        this.puertasVisible3 = this.puertasVisible3
      } else {
        this.puertasVisible3 = ""
      }
    }
    this.recintoIniciado3 = true
  }

  verRecinto() {
    this.vistaRecintos = true
    this.vistaCrearRecinto = false
  }

  borrarRecinto() {

    this.climaService.deleteRecinto(this.id, this.idRe)
  }

  iconoPuntos(idRecinto: any) {
    console.log("id recinto: ", idRecinto)
    this.idRe = idRecinto
    if (idRecinto != undefined) {
      var rowElement = document.getElementById(idRecinto);
      if (rowElement) {
        var estiloComputado = window.getComputedStyle(rowElement);
        var display = estiloComputado.display
        if (display == 'none') {
          rowElement.style.display = 'inline-flex';
        } else {
          rowElement.style.display = 'none';
        }
      }
    }
  }

  addRecinto() {
    if(this.nombreRecint == ''){
      this.alertaCampoNombre()
    }else{
      this.guardarRecinto()
      this.getIdRe()
      let equiposList = this.equiposList.listaEquipos
     this.getResultados(this.proyecto)
        
    
  
      const recinto: RecintosInterfaz = {
        idRec: this.idRe, nombre: this.nombreRecint, temp_verano: this.temp_int_ver,
        temp_invierno: this.temp_int_inv, hr_verano: this.hr_int_ver, hr_invierno: this.hr_int_inv, ida: this.nivelFiltracionRequerido, nivel_filtro: this.filtro, largo: this.longitud, ancho: this.anchura, alto: this.altura,
        volumen: this.calcVolumen, cerramiento1: this.listaParamCerramiento1, cerramiento2: this.listaParamCerramiento2, cerramiento3: this.listaParamCerramiento3, cerramiento4: this.listaParamCerramiento4, cubierta: this.cubiertaSeleccionada,
        color_cubierta: this.colorCerramientoCubierta, tempTechoVer: this.tempTechoVer, tempTechoInv: this.tempTechoInv, supTecho: this.supTecho,
        contieneVidrioTecho: this.vidrioSeleccionado4, superficieVidrioTecho: this.superficieVidrios4, tipoVidrio: this.tipoVidrio4, contienePuertasTecho: this.puertasVisible4, superficiePuertasTecho: this.superficiePuertas4,
        suelo: this.sueloSeleccionado, supeSuelo: this.supSuelo, numPersonas: this.numePersonas, cargaSensible: this.cargSensible, cargaLatente: this.cargLatente, caudalIda: this.caudalIda,
        caudalAire: this.aireRenovacion, lamparas: this.lamparaSeleccionada, potenciaIluminacion: this.potenciaIluminacion,mayoracion: this.factorSeguridad,  equipos:equiposList, 
        cargaSensibleRadiacionVidrio:this.cargaSensibleRadiacionVidrioF,cargaSensibleCerramientos:this.cargaSensibleCerramientosF, cargaSensibleAire:this.cargaSensibleAireF,
        cargaSensibleOcupacion:this.cargaSensibleOcupacionF, cargaSensibleIluminacion:this.cargaSensibleIluminacionF, cargaSensibleEquipamiento:this.cargaSensibleEquipamientoF,
        cargaTotalSensibleRefrigeracion:this.cargaTotalSensibleRefrigeracionF,cargaLatenteAire:this.cargaLatenteAireF,cargaLatenteOcupacion:this.cargaLatenteOcupacionF, cargaTotalLatenteRefrigeracion:this.cargaTotalLatenteRefrigeracionF, potenciaRefrigeracion:this.potenciaRefrigeracionF,
        cargaSensibleCerramientosInv:this.cargaSensibleCerramientosInvF, cargaSensibleAireInv:this.cargaSensibleAireInvF, cargaTotalSensibleCalefaccion:this.cargaTotalSensibleCalefaccionF,
        potenciaCalefaccion:this.potenciaCalefaccionF
      }
      console.log("idRec",this.idRe, "nombre:", this.nombreRecint, "temp_verano:",this.temp_int_ver,
        "temp_invierno:", this.temp_int_inv, "hr_verano:", this.hr_int_ver, "hr_invierno:", this.hr_int_inv, "ida:", this.nivelFiltracionRequerido, "nivel_filtro:", this.filtro, "largo:", this.longitud, "ancho:", this.anchura, "alto:", this.altura,
        "volumen:", this.calcVolumen, "cerramiento1:", this.listaParamCerramiento1, "cerramiento2:", this.listaParamCerramiento2, "cerramiento3:", this.listaParamCerramiento3, "cerramiento4:", this.listaParamCerramiento4, "cubierta:", this.cubiertaSeleccionada,
        "color_cubierta:", this.colorCerramientoCubierta, "tempTechoVer:", this.tempTechoVer, "tempTechoInv:", this.tempTechoInv, "supTecho:", this.supTecho,
        "contieneVidrioTecho:", this.vidrioSeleccionado4, "superficieVidrioTecho:", this.superficieVidrios4, "tipoVidrio:", this.tipoVidrio4, "contienePuertasTecho:", this.puertasVisible4, "superficiePuertasTecho:", this.superficiePuertas4,
        "suelo:", this.sueloSeleccionado, "supeSuelo:", this.supSuelo, "numPersonas:", this.numePersonas, "cargaSensible:", this.cargSensible, "cargaLatente:", this.cargLatente, "caudalIda:", this.caudalIda,
        "caudalAire:", this.aireRenovacion, "lamparas:",this.lamparaSeleccionada, "potenciaIluminacion:", this.potenciaIluminacion,"mayoracion:", this.factorSeguridad,  "equipos:", equiposList)
      
      this.verResultados = false
      this.climaService.agregarRecintoAProyecto(this.id, recinto)
    }
   

  }

  actualizarRecinto(nombreRecinto: IonInput, temp_verano: HTMLInputElement, temp_invierno: HTMLInputElement,
    hr_verano: HTMLInputElement, hr_invierno: HTMLInputElement, ida: IonSelect, nivelFiltro: HTMLInputElement, largo: HTMLInputElement, ancho: HTMLInputElement, alto: HTMLInputElement, volumen: HTMLInputElement, cubierta: IonRadioGroup, colorCubierta: IonSelect,
    tempeTechoVer: HTMLInputElement, tempeTechoInv: HTMLInputElement, supeTecho: HTMLInputElement, suelo: IonRadioGroup, numPersonas: HTMLInputElement, cargaSensible: HTMLInputElement, cargaLatente: HTMLInputElement, caudaIda: HTMLInputElement,
    airRenovacion: HTMLInputElement, mayoracion: HTMLInputElement, lampara: IonRadioGroup, potIluminacion: HTMLInputElement

  ) {

    this.verRecinto()
    this.getIdRe()
    const recint = this.recintos[this.idRe - 1]
    nombreRecinto.value = recint.nombre,
      temp_verano.value = recint.temp_verano,
      temp_invierno.value = recint.temp_invierno,
      hr_verano.value = recint.hr_verano,
      hr_invierno.value = recint.hr_invierno,
      ida.value = recint.ida,
      nivelFiltro.value = recint.nivel_filtro,
      largo.value = recint.largo,
      ancho.value = recint.ancho,
      alto.value = recint.alto,
      //volumen.value=recint.volumen,
      recint.cerramiento1 = this.listaParamCerramiento1,
      recint.cerramiento2 = this.listaParamCerramiento2,
      recint.cerramiento3 = this.listaParamCerramiento3,
      recint.cerramiento4 = this.listaParamCerramiento4
    recint.orientacionTecho = this.orientacionTechoString,
      cubierta.value = recint.cubierta,
      colorCubierta.value = recint.color_cubierta,
      tempeTechoVer = recint.tempTechoVer
    tempeTechoInv = recint.tempTechoInv
    supeTecho = recint.supeTecho
    suelo.value = recint.suelo,
      numPersonas.value = recint.numPersonas,
      cargaSensible.value = recint.cargaSensible,
      cargaLatente = recint.cargaLatente,
      caudaIda = recint.caudaIda,
      airRenovacion = recint.aireRenovacion,
      lampara = recint.lampara,
      potIluminacion = recint.potIluminacion,
      mayoracion = recint.mayoracion


    //this.crearRecinto()
    // Asigna el objeto recinto a this.recinto
    //this.proyecto = proyecto;
    //this.climaService.updateProyecto(this.proyecto, this.id)
  }




  cambioTempVerano() {
    this.tCerVer = this.temp_int_ver
    this.tCerVer1 = this.temp_int_ver
    this.tCerVer2 = this.temp_int_ver
    this.tCerVer3 = this.temp_int_ver
    this.tempTechoVer = this.temp_int_ver
    this.tempSueloVer = this.temp_int_ver
    this.cerramiento1Exterior = 'Interior'
    this.cerramiento1Exterior1 = 'Interior'
    this.cerramiento1Exterior1 = 'Interior'
    this.cerramiento1Exterior1 = 'Interior'
    this.cubiertaSeleccionada = 'Interior'
    this.sueloSeleccionado = 'Interior'

  }

  cambioTempInvierno() {
    this.tCerInv = this.temp_int_inv
    this.tCerInv1 = this.temp_int_inv
    this.tCerInv2 = this.temp_int_inv
    this.tCerInv3 = this.temp_int_inv
    this.tempTechoInv = this.temp_int_inv
    this.tempSueloInv = this.temp_int_inv
    this.cerramiento1Exterior = 'Interior'
    this.cerramiento1Exterior1 = 'Interior'
    this.cerramiento1Exterior1 = 'Interior'
    this.cerramiento1Exterior1 = 'Interior'
    this.cubiertaSeleccionada = 'Interior'
    this.sueloSeleccionado = 'Interior'

  }

  getCubiertaSeleccionada() {
    if (this.cubiertaSeleccionada == 'Exterior') {
      this.cubiertaDesabilitada = false
      this.colSupVisible = false
      this.cubierta.value = 'Exterior'
      this.valorCoor5 = 372
    } else {
      this.cubiertaDesabilitada = true
      this.colSupVisible = true
      this.cubierta.value = "Interior"
    }

  }

  getPuertasVisible(name: any) {
    if (this.puertasVisible == 'Si') {
      this.listaParamCerramiento1[6] = this.puertasVisible
      this.superfiPuertas = false
    } else {
      this.listaParamCerramiento1[6] = "No"
      this.superficiePuertas = 0
      this.listaParamCerramiento1[7] = 0
      this.superfiPuertas = true
    }

    if (this.puertasVisible1 == 'Si') {
      this.listaParamCerramiento2[6] = this.puertasVisible1
      this.superfiPuertas1 = false
    } else {
      this.listaParamCerramiento2[6] = "No"
      this.superficiePuertas1 = 0
      this.listaParamCerramiento2[7] = 0
      this.superfiPuertas1 = true
    }

    if (this.puertasVisible2 == 'Si') {
      this.listaParamCerramiento3[6] = this.puertasVisible2
      this.superfiPuertas2 = false
    } else {
      this.listaParamCerramiento3[6] = "No"
      this.superficiePuertas2 = 0
      this.listaParamCerramiento3[7] = 0
      this.superfiPuertas2 = true
    }

    if (this.puertasVisible3 == 'Si') {
      this.listaParamCerramiento4[6] = this.puertasVisible3
      this.superfiPuertas3 = false
    } else {
      this.listaParamCerramiento4[6] = "No"
      this.superficiePuertas3 = 0
      this.listaParamCerramiento4[7] = 0
      this.superfiPuertas3 = true
    }
    if (this.puertasVisible4 == 'Si') {
      this.superfiPuertas4 = false
    } else {
      this.superficiePuertas4 = 0
      this.superfiPuertas4 = true
    }
  }

  getVidrioSeleccionado() {

    if (this.vidrioSeleccionado == 'Si') {
      this.listaParamCerramiento1[3] = this.ventanas.value
      this.listaParamCerramiento1[5] = this.tipoVidrio
      this.vidrioDesabilitado = false
    } else {
      this.listaParamCerramiento1[3] = this.ventanas.value
      this.listaParamCerramiento1[4] = 0
      this.superficieVidrios = 0
      this.tipoVidrio = "Seleccione tipo vidrio"
      this.listaParamCerramiento1[5] = 'No necesario'
      this.vidrioDesabilitado = true
    }

    if (this.vidrioSeleccionado1 == 'Si') {
      this.listaParamCerramiento2[3] = this.ventanas1.value
      this.listaParamCerramiento2[5] = this.tipoVidrio1
      this.vidrioDesabilitado1 = false
    } else {
      this.listaParamCerramiento2[3] = this.ventanas1.value
      this.listaParamCerramiento2[4] = 0
      this.superficieVidrios1 = 0
      this.tipoVidrio1 = "Seleccione tipo vidrio"
      this.listaParamCerramiento2[5] = 'No necesario'
      this.vidrioDesabilitado1 = true
    }

    if (this.vidrioSeleccionado2 == 'Si') {
      this.listaParamCerramiento3[3] = this.ventanas2.value
      this.listaParamCerramiento3[5] = this.tipoVidrio2
      this.vidrioDesabilitado2 = false
    } else {
      this.listaParamCerramiento3[3] = this.ventanas2.value
      this.listaParamCerramiento3[4] = 0
      this.superficieVidrios2 = 0
      this.tipoVidrio2 = "Seleccione tipo vidrio"
      this.listaParamCerramiento3[5] = 'No necesario'
      this.vidrioDesabilitado2 = true
    }

    if (this.vidrioSeleccionado3 == 'Si') {
      this.listaParamCerramiento4[3] = this.ventanas3.value
      this.listaParamCerramiento4[5] = this.tipoVidrio3
      this.vidrioDesabilitado3 = false
    } else {
      this.listaParamCerramiento4[3] = this.ventanas3.value
      this.listaParamCerramiento4[4] = 0
      this.superficieVidrios3 = 0
      this.tipoVidrio3 = "Seleccione tipo vidrio"
      this.listaParamCerramiento4[5] = 'No necesario'
      this.vidrioDesabilitado3 = true
    }

    if (this.vidrioSeleccionado4 == 'Si') {
      this.vidrioDesabilitado4 = false
    } else {
      this.superficieVidrios4 = 0
      this.tipoVidrio4 = "Seleccione tipo vidrio"
      this.vidrioDesabilitado4 = true
    }

  }

  getColor() {
    if (this.cerramiento1Exterior == 'Exterior') {
      this.listaParamCerramiento1[1] = 'Exterior'
      this.colSupVisible = false
    } else {
      this.listaParamCerramiento1[1] = 'Interior'
      this.colSupVisible = true
      this.tCerVer = this.temp_int_ver
      this.tCerInv = this.temp_int_inv
      this.colorCerramiento1 = ''
    }

    if (this.cerramiento1Exterior1 == 'Exterior') {
      this.listaParamCerramiento2[1] = 'Exterior'
      this.colSupVisible1 = false
    } else {
      this.listaParamCerramiento2[1] = 'Interior'
      this.colSupVisible1 = true
      this.tCerVer1 = this.temp_int_ver
      this.tCerInv1 = this.temp_int_inv
      this.colorCerramiento2 = ''
    }

    if (this.cerramiento1Exterior2 == 'Exterior') {
      this.listaParamCerramiento3[1] = 'Exterior'
      this.colSupVisible2 = false
    } else {
      this.listaParamCerramiento3[1] = 'Interior'
      this.colSupVisible2 = true
      this.tCerVer2 = this.temp_int_ver
      this.tCerInv2 = this.temp_int_inv
      this.colorCerramiento3 = ''
    }

    if (this.cerramiento1Exterior3 == 'Exterior') {
      this.listaParamCerramiento4[1] = 'Exterior'
      this.colSupVisible3 = false
    } else {
      this.listaParamCerramiento4[1] = 'Interior'
      this.colSupVisible3 = true
      this.tCerVer3 = this.temp_int_ver
      this.tCerInv3 = this.temp_int_inv
      this.colorCerramiento4 = ''
    }
  }

  getColorCerramiento1(name: any) {

    switch (name) {
      case 'coor1':
        this.listaParamCerramiento1[2] = this.colorCerramiento1
        this.tCerInv = this.proyecto.t_exteriorI
        if (this.colorCerramiento1 == 'Claro') {
          if (this.listaParamCerramiento1[0] == 'Norte') {
            this.tCerVer = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento1[0] == 'Sur') {
            this.tCerVer = this.proyecto.t_exteriorV + 2
          } else {
            this.tCerVer = this.proyecto.t_exteriorV + 3
          }
        }
        if (this.colorCerramiento1 == 'Medio') {
          if (this.listaParamCerramiento1[0] == 'Norte') {
            this.tCerVer = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento1[0] == 'Sur') {
            this.tCerVer = this.proyecto.t_exteriorV + 3
          } else {
            this.tCerVer = this.proyecto.t_exteriorV + 4
          }
        }
        if (this.colorCerramiento1 == 'Oscuro') {
          if (this.listaParamCerramiento1[0] == 'Norte') {
            this.tCerVer = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento1[0] == 'Sur') {
            this.tCerVer = this.proyecto.t_exteriorV + 3
          } else {
            this.tCerVer = this.proyecto.t_exteriorV + 5
          }
        }
        break
      case 'coor2':
        this.listaParamCerramiento2[2] = this.colorCerramiento2
        this.tCerInv1 = this.proyecto.t_exteriorI
        if (this.colorCerramiento2 == 'Claro') {
          if (this.listaParamCerramiento2[0] == 'Norte') {
            this.tCerVer1 = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento2[0] == 'Sur') {
            this.tCerVer1 = this.proyecto.t_exteriorV + 2
          } else {
            this.tCerVer1 = this.proyecto.t_exteriorV + 3
          }
        }
        if (this.colorCerramiento2 == 'Medio') {
          if (this.listaParamCerramiento2[0] == 'Norte') {
            this.tCerVer1 = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento2[0] == 'Sur') {
            this.tCerVer1 = this.proyecto.t_exteriorV + 3
          } else {
            this.tCerVer1 = this.proyecto.t_exteriorV + 4
          }
        }
        if (this.colorCerramiento2 == 'Oscuro') {
          if (this.listaParamCerramiento2[0] == 'Norte') {
            this.tCerVer1 = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento2[0] == 'Sur') {
            this.tCerVer1 = this.proyecto.t_exteriorV + 3
          } else {
            this.tCerVer1 = this.proyecto.t_exteriorV + 5
          }
        }
        break
      case 'coor3':
        this.listaParamCerramiento3[2] = this.colorCerramiento3
        this.tCerInv2 = this.proyecto.t_exteriorI
        if (this.colorCerramiento3 == 'Claro') {
          if (this.listaParamCerramiento3[0] == 'Norte') {
            this.tCerVer2 = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento3[0] == 'Sur') {
            this.tCerVer2 = this.proyecto.t_exteriorV + 2
          } else {
            this.tCerVer2 = this.proyecto.t_exteriorV + 3
          }
        }
        if (this.colorCerramiento3 == 'Medio') {
          if (this.listaParamCerramiento3[0] == 'Norte') {
            this.tCerVer2 = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento3[0] == 'Sur') {
            this.tCerVer2 = this.proyecto.t_exteriorV + 3
          } else {
            this.tCerVer2 = this.proyecto.t_exteriorV + 4
          }
        }
        if (this.colorCerramiento3 == 'Oscuro') {
          if (this.listaParamCerramiento3[0] == 'Norte') {
            this.tCerVer2 = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento3[0] == 'Sur') {
            this.tCerVer2 = this.proyecto.t_exteriorV + 3
          } else {
            this.tCerVer2 = this.proyecto.t_exteriorV + 5
          }
        }
        break
      case 'coor4':
        this.listaParamCerramiento4[2] = this.colorCerramiento4
        this.tCerInv3 = this.proyecto.t_exteriorI
        if (this.colorCerramiento4 == 'Claro') {
          if (this.listaParamCerramiento4[0] == 'Norte') {
            this.tCerVer3 = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento4[0] == 'Sur') {
            this.tCerVer3 = this.proyecto.t_exteriorV + 2
          } else {
            this.tCerVer3 = this.proyecto.t_exteriorV + 3
          }
        }
        if (this.colorCerramiento4 == 'Medio') {
          if (this.listaParamCerramiento4[0] == 'Norte') {
            this.tCerVer3 = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento4[0] == 'Sur') {
            this.tCerVer3 = this.proyecto.t_exteriorV + 3
          } else {
            this.tCerVer3 = this.proyecto.t_exteriorV + 4
          }
        }
        if (this.colorCerramiento4 == 'Oscuro') {
          if (this.listaParamCerramiento4[0] == 'Norte') {
            this.tCerVer3 = this.proyecto.t_exteriorV
          } else if (this.listaParamCerramiento4[0] == 'Sur') {
            this.tCerVer3 = this.proyecto.t_exteriorV + 3
          } else {
            this.tCerVer3 = this.proyecto.t_exteriorV + 5
          }
        }
        break
      case 'coor5':
        this.tempTechoInv = this.proyecto.t_exteriorI
        if (this.colorCerramientoCubierta == 'Claro') {
          this.tempTechoVer = this.proyecto.t_exteriorV + 5
        }
        if (this.colorCerramientoCubierta == 'Medio') {
         this.tempTechoVer = this.proyecto.t_exteriorV + 9
        }
        if (this.colorCerramientoCubierta == 'Oscuro') {
          this.tempTechoVer = this.proyecto.t_exteriorV + 11
        }
        break
      }
  }



  getTempSuelo() {
    if (this.sueloSeleccionado == 'Interior') {
      this.tempSueloVer = this.temp_int_ver
      this.tempSueloInv = this.temp_int_inv
    } else if (this.sueloSeleccionado == 'Exterior') {
      this.tempSueloVer = this.proyecto.t_exteriorV
      this.tempSueloInv = this.proyecto.t_exteriorI
    } else {
      this.tempSueloVer = this.proyecto.temp_suelo_V
      this.tempSueloInv = this.proyecto.temp_suelo_I
    }
  }

  getPotenciaIluminacion() { }

  getFactorSeguridad() { }

  getResultados(proyecto: ProyectosInterfaz) {



    /*VALOR TIPO VIDRIO *******************************/


    /*VALOR EXTERIOR INTERIOR ***************************/
    let cerramientoExtInt1 = this.getValorCerrExtInt(this.proyecto, 'cerramiento1')
    let cerramientoExtInt2 = this.getValorCerrExtInt(this.proyecto, 'cerramiento2')
    let cerramientoExtInt3 = this.getValorCerrExtInt(this.proyecto, 'cerramiento3')
    let cerramientoExtInt4 = this.getValorCerrExtInt(this.proyecto, 'cerramiento4')
    let techoExtInt = this.getValorCerrExtInt(this.proyecto, 'techo')
    let sueloExtInt = this.getValorCerrExtInt(this.proyecto, 'suelo')

    /*CARGA SENSIBLE EQUIPAMIENTOS ***************************/
    const cargaEquipamiento = this.getCargaEquipo()


    /* RESULTADO SUMA EQUIPOS********************************************/

    this.presion = 101325 * Math.pow((1 - 0.0065 / (15 + 273.15) * proyecto.altitud), (9.807 / 0.2883419 / 0.0065 / 1000))
    console.log("presion: ", this.presion)
    this.p_sat_agua_ext_ver = Math.exp(-5800.2206 * Math.pow((proyecto.t_exteriorV + 273.15), -1) + 1.3914993 - 0.048640239 * (proyecto.t_exteriorV + 273.15) + 0.000041764768 * Math.pow((proyecto.t_exteriorV + 273.15), 2) - 0.000000014452093 * Math.pow((proyecto.t_exteriorV + 273.15), 3) + 6.5459673 * Math.log(proyecto.t_exteriorV + 273.15))
    console.log("p_sat_agua_ext_ver:", this.p_sat_agua_ext_ver)
    this.hum_absol_ext_ver = 1000 * 0.62198 * (proyecto.h_relativaV / 100) * this.p_sat_agua_ext_ver / (this.presion - (proyecto.h_relativaV / 100) * this.p_sat_agua_ext_ver)
    console.log("hum_absol_ext_ver:", this.hum_absol_ext_ver)
    this.entalpia_ext_ver_sens = (1.006 * proyecto.t_exteriorV + (this.hum_absol_ext_ver / 1000) * (1.89 * proyecto.t_exteriorV)) * 1000
    console.log("entalpia_ext_ver_sens:", this.entalpia_ext_ver_sens)
    this.entalpia_ext_ver_lat = (this.hum_absol_ext_ver / 1000) * (2501.3) * 1000
    console.log("entalpia_ext_ver_lat:", this.entalpia_ext_ver_lat)
    this.volum_espe_ext_ver = 0.2870551882 * (proyecto.t_exteriorV + 273.15) * (1 + 1.6078 * this.hum_absol_ext_ver / 1000) / (this.presion / 1000)
    console.log("volum_espe_ext_ver:", this.volum_espe_ext_ver)
    this.p_sat_agua_ext_inv = Math.exp(-5800.2206 * Math.pow((proyecto.t_exteriorI + 273.15), -1) + 1.3914993 - 0.048640239 * (proyecto.t_exteriorI + 273.15) + 0.000041764768 * Math.pow((proyecto.t_exteriorI + 273.15), 2) - 0.000000014452093 * Math.pow((proyecto.t_exteriorI + 273.15), 3) + 6.5459673 * Math.log(proyecto.t_exteriorI + 273.15))
    console.log("p_sat_agua_ext_inv:", this.p_sat_agua_ext_inv)
    // OJO CON ESTA FORMULA
    this.hum_absol_ext_inv = 1000 * 0.62198 * (proyecto.h_relativaI / 100) * this.p_sat_agua_ext_inv / (this.presion - (proyecto.h_relativaI / 100) * this.p_sat_agua_ext_inv)
    console.log("hum_absol_ext_inv:", this.hum_absol_ext_inv)
    this.entalpia_ext_inv_sens = (1.006 * proyecto.t_exteriorI + (this.hum_absol_ext_inv / 1000) * (1.89 * proyecto.t_exteriorI)) * 1000
    console.log("entalpia_ext_inv_sens:", this.entalpia_ext_inv_sens)
    this.entalpia_ext_inv_lat = (this.hum_absol_ext_inv / 1000) * (2501.3) * 1000
    console.log("entalpia_ext_inv_lat:", this.entalpia_ext_inv_lat)
    this.volum_espe_ext_inv = 0.2870551882 * (proyecto.t_exteriorI + 273.15) * (1 + 1.6078 * this.hum_absol_ext_inv / 1000) / (this.presion / 1000)
    console.log("volum_espe_ext_inv:", this.volum_espe_ext_inv)
    this.p_sat_agua_int_ver = Math.exp(-5800.2206 * Math.pow((this.temp_int_ver + 273.15), -1) + 1.3914993 - 0.048640239 * (this.temp_int_ver + 273.15) + 0.000041764768 * Math.pow((this.temp_int_ver + 273.15), 2) - 0.000000014452093 * Math.pow((this.temp_int_ver + 273.15), 3) + 6.5459673 * Math.log(this.temp_int_ver + 273.15))
    console.log("p_sat_agua_int_ver:", this.p_sat_agua_int_ver)
    this.hum_absol_int_ver = 1000 * 0.62198 * (this.hr_int_ver / 100) * this.p_sat_agua_int_ver / (this.presion - (this.hr_int_ver / 100) * this.p_sat_agua_int_ver)
    console.log("hum_absol_int_ver:", this.hum_absol_int_ver)
    this.entalpia_int_ver_sens = (1.006 * this.temp_int_ver + (this.hum_absol_int_ver / 1000) * (1.89 * this.temp_int_ver)) * 1000
    console.log("entalpia_int_ver_sens:", this.entalpia_int_ver_sens)
    this.entalpia_int_ver_lat = (this.hum_absol_int_ver / 1000) * (2501.3) * 1000
    console.log("entalpia_int_ver_lat:", this.entalpia_int_ver_lat)
    this.volum_espe_int_ver = 0.2870551882 * (this.temp_int_ver + 273.15) * (1 + 1.6078 * this.hum_absol_int_ver / 1000) / (this.presion / 1000)
    console.log("volum_espe_int_ver:", this.volum_espe_int_ver)
    this.p_sat_agua_int_inv = Math.exp(-5800.2206 * Math.pow((this.temp_int_inv + 273.15), -1) + 1.3914993 - 0.048640239 * (this.temp_int_inv + 273.15) + 0.000041764768 * Math.pow((this.temp_int_inv + 273.15), 2) - 0.000000014452093 * Math.pow((this.temp_int_inv + 273.15), 3) + 6.5459673 * Math.log(this.temp_int_inv + 273.15))
    console.log("p_sat_agua_int_inv:", this.p_sat_agua_int_inv)
    this.hum_absol_int_inv = 1000 * 0.62198 * (this.hr_int_inv / 100) * this.p_sat_agua_int_inv / (this.presion - (this.hr_int_inv / 100) * this.p_sat_agua_int_inv)
    console.log("hum_absol_int_inv:", this.hum_absol_int_inv)
    this.entalpia_int_inv_sens = (1.006 * this.temp_int_inv + (this.hum_absol_int_inv / 1000) * (1.89 * this.temp_int_inv)) * 1000
    console.log("entalpia_int_inv_sens:", this.entalpia_int_inv_sens)
    this.entalpia_int_inv_lat = (this.hum_absol_int_inv / 1000) * (2501.3) * 1000
    console.log("entalpia_int_inv_lat:", this.entalpia_int_inv_lat)
    this.volum_espe_int_inv = 0.2870551882 * (this.temp_int_inv + 273.15) * (1 + 1.6078 * this.hum_absol_int_inv / 1000) / (this.presion / 1000)
    console.log("volum_espe_int_inv", this.volum_espe_int_inv)
    //Esta formula es correcta 
    this.cargaSensibleRadiacionVidrio = (this.valorCoor1 * this.superficieVidrios * this.tipoVidrioValor) + (this.valorCoor2 * this.superficieVidrios1 * this.tipoVidrioValor1) +
      (this.valorCoor3 * this.superficieVidrios2 * this.tipoVidrioValor2) + (this.valorCoor4 * this.superficieVidrios3 * this.tipoVidrioValor3) + 
      (this.valorCoor5 * this.superficieVidrios4 * this.tipoVidrioValor4)
      this.cargaSensibleRadiacionVidrioF = this.cargaSensibleRadiacionVidrio.toFixed(2)
  
    console.log("Radiaciones de vidrio:-------------------------------")
    console.log(this.valorCoor1, this.superficieVidrios, this.tipoVidrioValor)
    console.log((this.valorCoor1 * this.superficieVidrios * this.tipoVidrioValor))
    console.log((this.valorCoor2 * this.superficieVidrios1 * this.tipoVidrioValor1))
    console.log((this.valorCoor3 * this.superficieVidrios2 * this.tipoVidrioValor2))
    console.log((this.valorCoor4 * this.superficieVidrios3 * this.tipoVidrioValor3))
    console.log((this.valorCoor5 * this.superficieVidrios4 * this.tipoVidrioValor4))
    console.log("1 :", this.cargaSensibleRadiacionVidrio)
     // Es correcto si no contiene vidrios





    //Esta formula es correcta No comprobada
    this.cargaSensibleCerramientos = -((cerramientoExtInt1 * (this.supCerra - this.superficieVidrios - this.superficiePuertas) * (this.temp_int_ver - this.tCerVer)) + (this.proyecto.uh * this.superficieVidrios * (this.temp_int_ver - this.tCerVer)) + (this.proyecto.up * this.superficiePuertas * (this.temp_int_ver - this.tCerVer)) +
     (cerramientoExtInt2 * (this.supCerra1 - this.superficieVidrios1 - this.superficiePuertas1) * (this.temp_int_ver - this.tCerVer1)) + (this.proyecto.uh * this.superficieVidrios1 * (this.temp_int_ver - this.tCerVer1)) + (this.proyecto.up * this.superficiePuertas1 * (this.temp_int_ver - this.tCerVer1)) +
      (cerramientoExtInt3 * (this.supCerra2 - this.superficieVidrios2 - this.superficiePuertas2) * (this.temp_int_ver - this.tCerVer2)) + (this.proyecto.uh * this.superficieVidrios2 * (this.temp_int_ver - this.tCerVer2)) + (this.proyecto.up * this.superficiePuertas2 * (this.temp_int_ver - this.tCerVer2)) + 
      (cerramientoExtInt4 * (this.supCerra3 - this.superficieVidrios3 - this.superficiePuertas3) * (this.temp_int_ver - this.tCerVer3)) + (this.proyecto.uh * this.superficieVidrios3 * (this.temp_int_ver - this.tCerVer3)) + (this.proyecto.up * this.superficiePuertas3 * (this.temp_int_ver - this.tCerVer3)) + 
      (techoExtInt * (this.supTecho - this.superficieVidrios4 - this.superficiePuertas4) * (this.temp_int_ver - this.tempTechoVer)) + (this.proyecto.uh * this.superficieVidrios4 * (this.temp_int_ver - this.tempTechoVer)) + (this.proyecto.up * this.superficiePuertas4 * (this.temp_int_ver - this.tempTechoVer)) + 
      (sueloExtInt * (this.supSuelo) * (this.temp_int_ver - this.tempSueloVer)))
      this.cargaSensibleCerramientosF = this.cargaSensibleCerramientos.toFixed(2)

      let c1 = (cerramientoExtInt1 * (this.supCerra - this.superficieVidrios - this.superficiePuertas) * (this.temp_int_ver - this.tCerVer)) + (this.proyecto.uh * this.superficieVidrios * (this.temp_int_ver - this.tCerVer)) + (this.proyecto.up * this.superficiePuertas * (this.temp_int_ver - this.tCerVer))
      let c2 = (cerramientoExtInt2 * (this.supCerra1 - this.superficieVidrios1 - this.superficiePuertas1) * (this.temp_int_ver - this.tCerVer1)) + (this.proyecto.uh * this.superficieVidrios1 * (this.temp_int_ver - this.tCerVer1)) + (this.proyecto.up * this.superficiePuertas1 * (this.temp_int_ver - this.tCerVer1))
      let c3 = (cerramientoExtInt3 * (this.supCerra2 - this.superficieVidrios2 - this.superficiePuertas2) * (this.temp_int_ver - this.tCerVer2)) + (this.proyecto.uh * this.superficieVidrios2 * (this.temp_int_ver - this.tCerVer2)) + (this.proyecto.up * this.superficiePuertas2 * (this.temp_int_ver - this.tCerVer2))
      let c4 = (cerramientoExtInt4 * (this.supCerra3 - this.superficieVidrios3 - this.superficiePuertas3) * (this.temp_int_ver - this.tCerVer3)) + (this.proyecto.uh * this.superficieVidrios3 * (this.temp_int_ver - this.tCerVer3)) + (this.proyecto.up * this.superficiePuertas3 * (this.temp_int_ver - this.tCerVer3))
      let c5 = (techoExtInt * (this.supTecho - this.superficieVidrios4 - this.superficiePuertas4) * (this.temp_int_ver - this.tempTechoVer)) + (this.proyecto.uh * this.superficieVidrios4 * (this.temp_int_ver - this.tempTechoVer)) + (this.proyecto.up * this.superficiePuertas4 * (this.temp_int_ver - this.tempTechoVer))
      let c6 = (sueloExtInt * (this.supSuelo) * (this.temp_int_ver - this.tempSueloVer))
      console.log("Formulas cerramientos:-------------------------------------")
      console.log(cerramientoExtInt1)
    console.log("1: ", c1 )
    console.log("2: ", c2 )
    console.log("3: ", c3 )
    console.log("4: ", c4 )
    console.log("5: ", c5 )
    console.log("6: ", c6 )
    
    
    //Esta formula es correcta No comprobada
    this.cargaSensibleAire = (this.aireRenovacion / 3600) * (1 / this.volum_espe_int_ver) * (this.entalpia_ext_ver_sens - this.entalpia_int_ver_sens) * 1.1
    this.cargaSensibleAireF = this.cargaSensibleAire.toFixed(2)
    
    console.log("2 :", this.cargaSensibleAire)
    //OJO Carga sensible por persona (W/persona) crear si actividad sedentaria: 70*ocupacion; si trabajo activo: 150*ocupacion
    //OJO Carga latente por persona (W/persona) crear si actividad sedentaria: 50*ocupacion; si trabajo activo: 300*ocupacion
    this.cargaSensibleOcupacion = this.cargSensible
    this.cargaSensibleOcupacionF = this.cargaSensibleOcupacion.toFixed(2)
    console.log("3 :", this.cargaSensibleOcupacion)

    //Esta formula es correcta FUNCIONA
    this.cargaSensibleIluminacion = this.potenciaIluminacion * this.supSuelo
    this.cargaSensibleIluminacionF =  this.cargaSensibleIluminacion.toFixed(2)
    console.log("4 :", this.cargaSensibleIluminacion)

    //Esta formula es correcta FUNCIONA
    this.cargaSensibleEquipamiento = cargaEquipamiento
    this.cargaSensibleEquipamientoF = this.cargaSensibleEquipamiento.toFixed(2)
    
    console.log("5 :", this.cargaSensibleEquipamiento)
    //Esta formula es correcta No comprobada
    this.cargaTotalSensibleRefrigeracion = this.cargaSensibleRadiacionVidrio + this.cargaSensibleCerramientos + this.cargaSensibleAire + this.cargaSensibleOcupacion + this.cargaSensibleIluminacion + this.cargaSensibleEquipamiento
    this.cargaTotalSensibleRefrigeracionF = this.cargaTotalSensibleRefrigeracion.toFixed(2)
    console.log("1:", this.cargaSensibleRadiacionVidrio, "2:", this.cargaSensibleCerramientos, "3:", this.cargaSensibleAire, "4:", this.cargaSensibleOcupacion, "5:", this.cargaSensibleIluminacion, "6:", this.cargaSensibleEquipamiento)
                       //qv_sens_rad+qv_sens_trans+qv_sens_renov+qv_sens_ocup+qv_sens_ilum+qv_sens_equip

    //Esta formula es correcta No comprobada
    this.cargaLatenteAire = (this.aireRenovacion / 3600) * (1 / this.volum_espe_int_ver) * (this.entalpia_ext_ver_lat - this.entalpia_int_ver_lat) * 1.1
    this.cargaLatenteAireF = this.cargaLatenteAire.toFixed(2)
    console.log("7 :", this.cargaLatenteAire)
    //Esta formula es correcta No comprobada
    this.cargaLatenteOcupacion = this.cargLatente
    this.cargaLatenteOcupacionF = this.cargaLatenteOcupacion.toFixed(2)
    console.log("8 :", this.cargaLatenteOcupacion)
    //Esta formula es correcta No comprobada
    this.cargaTotalLatenteRefrigeracion = this.cargaLatenteAire + this.cargaLatenteOcupacion
    this.cargaTotalLatenteRefrigeracionF = this.cargaTotalLatenteRefrigeracion.toFixed(2)
    console.log("9 :", this.cargaTotalLatenteRefrigeracion)
    //Esta formula es correcta No comprobada
    this.potenciaRefrigeracion = (this.cargaTotalSensibleRefrigeracion + this.cargaTotalLatenteRefrigeracion) * (1 + this.factorSeguridad / 100)
    this.potenciaRefrigeracionF = this.potenciaRefrigeracion.toFixed(2)
    console.log("10 :", this.potenciaRefrigeracion)
    /************************************************************************ INVIERNO ******************************************************************/

    //Esta formula es correcta No comprobada
    this.cargaSensibleCerramientosInv = (cerramientoExtInt1 * (this.supCerra - this.superficieVidrios - this.superficiePuertas) * (this.temp_int_inv - this.tCerInv)) + (this.proyecto.uh * this.superficieVidrios * (this.temp_int_inv - this.tCerInv)) + (this.proyecto.up * this.superficiePuertas * (this.temp_int_inv - this.tCerInv)) + (cerramientoExtInt2 * (this.supCerra1 - this.superficieVidrios1 - this.superficiePuertas1) * (this.temp_int_inv - this.tCerInv1)) + (this.proyecto.uh * this.superficieVidrios1 * (this.temp_int_inv - this.tCerInv1)) + (this.proyecto.up * this.superficiePuertas1 * (this.temp_int_inv - this.tCerInv1)) + (cerramientoExtInt3 * (this.supCerra2 - this.superficieVidrios2 - this.superficiePuertas2) * (this.temp_int_inv - this.tCerInv2)) + (this.proyecto.uh * this.superficieVidrios2 * (this.temp_int_inv - this.tCerInv2)) + (this.proyecto.up * this.superficiePuertas2 * (this.temp_int_inv - this.tCerInv2)) + (cerramientoExtInt4 * (this.supCerra3 - this.superficieVidrios3 - this.superficiePuertas3) * (this.temp_int_inv - this.tCerInv3)) + (this.proyecto.uh * this.superficieVidrios3 * (this.temp_int_inv - this.tCerInv3)) + (this.proyecto.up * this.superficiePuertas3 * (this.temp_int_inv - this.tCerInv3)) + (techoExtInt * (this.supTecho - this.superficieVidrios4 - this.superficiePuertas4) * (this.temp_int_inv - this.tempTechoInv)) + (this.proyecto.uh * this.superficieVidrios4 * (this.temp_int_inv - this.tempTechoInv)) + (this.proyecto.up * this.superficiePuertas4 * (this.temp_int_inv - this.tempTechoInv)) + (sueloExtInt * (this.supSuelo) * (this.temp_int_inv - this.tempSueloInv))
    this.cargaSensibleCerramientosInvF = this.cargaSensibleCerramientosInv.toFixed(2)
    
    console.log("11 :", this.cargaSensibleCerramientosInv)
    //Esta formula es correcta No comprobada
    this.cargaSensibleAireInv = -(this.aireRenovacion / 3600) * (1 / this.volum_espe_int_inv) * (this.entalpia_ext_inv_sens - this.entalpia_int_inv_sens) * 1.1
    this.cargaSensibleAireInvF = this.cargaSensibleAireInv.toFixed(2) 
   
    console.log("carga sensible aire 1:", this.volum_espe_int_inv, "2:", this.entalpia_ext_inv_sens, "3:", this.entalpia_int_inv_sens)
    console.log("12 :", this.cargaSensibleAireInv)
    //Esta formula es correcta No comprobada
    this.cargaTotalSensibleCalefaccion = this.cargaSensibleCerramientosInv + this.cargaSensibleAireInv
    this.cargaTotalSensibleCalefaccionF = this.cargaTotalSensibleCalefaccion.toFixed(2)
    console.log("13 :", this.cargaTotalSensibleCalefaccion)
    ////Esta formula es correcta No comprobada
    this.potenciaCalefaccion = this.cargaTotalSensibleCalefaccion * (1 + this.factorSeguridad / 100)
    this.potenciaCalefaccionF = this.potenciaCalefaccion.toFixed(2)
    console.log("14 :", this.potenciaCalefaccion)
  }


  getValorCerrExtInt(proyecto: ProyectosInterfaz, cerramiento: string) {
    let valor: number = 0
    if (cerramiento == 'cerramiento1') {
      if (this.cerramiento1Exterior == 'Exterior') {
        valor = proyecto.usum
      } else {
        valor = proyecto.uphv
      }
    }
    if (cerramiento == 'cerramiento2') {
      if (this.cerramiento1Exterior1 == 'Exterior') {
        valor = proyecto.usum
      } else {
        valor = proyecto.uphv
      }
    }
    if (cerramiento == 'cerramiento3') {
      if (this.cerramiento1Exterior2 == 'Exterior') {
        valor = proyecto.usum
      } else {
        valor = proyecto.uphv
      }
    }
    if (cerramiento == 'cerramiento4') {
      if (this.cerramiento1Exterior3 == 'Exterior') {
        valor = proyecto.usum
      } else {
        valor = proyecto.uphv
      }
    }
    if (cerramiento == 'techo') {
      if (this.cubiertaSeleccionada == 'Exterior') {
        valor = proyecto.uc
      } else {
        valor = proyecto.uphv
      }
    }
    if (cerramiento == 'suelo') {
      if (this.sueloSeleccionado == 'Exterior') {
        valor = proyecto.usum
      } else if (this.sueloSeleccionado == 'Interior') {
        valor = proyecto.uphv
      } else {
        valor = proyecto.utumd
      }

    }


    console.log("El valor de ", cerramiento, "es: ", valor)
    return valor
  }
  calculoVolumen() {
    if (this.altura != 0 && this.anchura != 0 && this.longitud != 0) {
      this.calcVolumen = this.altura * this.anchura * this.longitud
      this.setSupCerramiento()
    }
  }

  onClick() {
    console.log(this.proyecto['titulo'])
  }

  getFiltros() {
    let ida1 = 'ida1'
    let ida2 = 'ida2'
    let ida3 = 'ida3'
    let ida4 = 'ida4'

    this.leeJson.get<any[]>('assets/data/oda.json').subscribe(data => {
      // Recorrer el arreglo de objetos JSON
      data.forEach(obj => {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            let oda = obj[key];
            console.log('Clave:', key);
            if (key == this.proyecto.oda) {
              for (let ida in oda) {
                if (oda.hasOwnProperty(ida)) {
                  if (ida == this.nivelFiltracionRequerido) {
                    this.filtro = oda[ida];
                    if (ida == 'ida1') {
                      this.caudalIda = 20
                      this.aireRenovacion = this.longitud * this.anchura / 2 * this.caudalIda * 3.6
                    }
                    if (ida == 'ida2') {
                      this.caudalIda = 12.5
                      this.aireRenovacion = this.longitud * this.anchura / 2 * this.caudalIda * 3.6

                    }
                    if (ida == 'ida3') {
                      this.caudalIda = 8
                      this.aireRenovacion = this.longitud * this.anchura / 2 * this.caudalIda * 3.6
                    }
                    if (ida == 'ida4') {
                      this.caudalIda = 5
                      this.aireRenovacion = this.longitud * this.anchura / 2 * this.caudalIda * 3.6
                    }
                  }

                }
              }
            }
            // Recorrer las propiedades del objeto interno

          }
        }
      });
    });

  }

  // Obtengo el proyecto actual
  proyectoActual() {
    this.consulta.buscarDocumentoPorId('proyectos', this.id).subscribe(doc => {
      this.proyecto = doc;
      this.recintos = this.proyecto.recintos
      console.log("proyectos:", this.proyecto)

    });
  }
}
