import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProyectosInterfaz} from "./proyectos-interfaz";
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RecintosInterfaz } from "./recintos-interfaz";
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import firebase from 'firebase/app';


interface Recinto {
  id: number;
}

interface Proyecto {
  recintos: Recinto[];
}

@Injectable({
  providedIn: 'root'
})
export class ClimaServiceService {

  proyectos!: Observable<any[]>;
  recintos!:Observable<any[]>;

  dbProyectos:string = '';
  dbRecintos:string='';
  constructor(private firestore:AngularFirestore, private variableGlobal:NavController,
              private http:HttpClient, private router:Router, private alertControler:AlertController) { }

  //Leer la base de datos que pasemos por parametro
  readDb(dbnombre:string): Observable<any>{
    return this.firestore.collection(dbnombre).snapshotChanges();
  }

  
  
  //buscar solo el documento que contenga el id especificado
  buscarDocumentoPorId(dbnombre: string, id: string): Observable<any> {
    return this.firestore.collection(dbnombre).doc(id).get().pipe(
      map(doc => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log('No se encontró el documento.');
          return null;
        }
      })
    );
  }

  setRecinto(recinto: RecintosInterfaz){
    console.log(recinto);
    this.firestore.collection("recintos").add(recinto);
  }

  setProyecto(proyecto: ProyectosInterfaz){
   this.firestore.collection("proyectos").add(proyecto);
  }

  updateProyecto(proyecto:ProyectosInterfaz, id:string){
    
    try {
      this.firestore.collection("proyectos").doc(id).update(proyecto);
      this.exitoActualizacionProyecto();
    } catch (error) {
      this.mostrarErrorActualizacion();
    }
  
  }

  /********************** IMPLEMENTAR ACTUALIZAR RECINTO ***********************************  */
  /*updateRecinto(recinto: RecintosInterfaz){
    console.log("UpdateRecinto, datos", recinto.id);
    this.firestore.collection("recintos").doc(recinto.nombre).update(recinto);
  }*/
  agregarRecintoAProyecto(proyectoId: string, recinto: any) {
    // Obtener referencia al documento del proyecto
    const proyectoRef = this.firestore.collection('proyectos').doc(proyectoId);
    console.log("antes de actualizar:", recinto)

    // Obtener los datos actuales del proyecto
    proyectoRef.get().subscribe(snapshot => {
      if (snapshot.exists) {
        const proyectoData:any = snapshot.data();
        
        // Obtener la lista actual de recintos
        let recintos: any[] = proyectoData.recintos || [];

        // Agregar el nuevo recinto a la lista

       
        recintos.push(recinto);
       

        // Actualizar el campo 'recintos' en el documento del proyecto
        proyectoRef.update({ recintos: recintos })
          .then(() => {
            console.log('Recinto agregado al proyecto correctamente.');
          })
          .catch(error => {
            console.error('Error al agregar recinto al proyecto:', error);
          });
      } else {
        console.error('El proyecto con ID', proyectoId, 'no existe.');
      }
    });
  }



  async deleteRecinto(proyectoId: string, recintoId: number) {
  
    const proyectoDoc = this.firestore.collection('proyectos').doc(proyectoId);
    console.log("Id proyecto:", proyectoId);
    const proyectoSnapshot = await proyectoDoc.ref.get();

    if (proyectoSnapshot.exists) {
      const proyectoData = proyectoSnapshot.data() as Proyecto; // Type casting
      if (proyectoData && Array.isArray(proyectoData.recintos)) {
        // Recinto ID es el índice + 1
        const recintoIndex = recintoId - 1;
        if (recintoIndex >= 0 && recintoIndex < proyectoData.recintos.length) {
          proyectoData.recintos.splice(recintoIndex, 1);
           const alert = await this.alertControler.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este recinto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler:async () => {
            await proyectoDoc.update({
              recintos: proyectoData.recintos
            });
            window.location.reload();
          }
        }
      ]
    });
    await alert.present();
  }
          

          console.log(`Recinto con id ${recintoId} eliminado.`);
          console.log("Recintos después de eliminar:", proyectoData.recintos);
        } else {
          console.log(`Recinto con id ${recintoId} no existe en la lista.`);
        }
      } else {
        console.log('No hay recintos en el documento o el campo recintos no es una lista.');
      }
    } 
  



  deleteProyecto(id:string){
    return this.firestore.collection("proyectos").doc(id).delete();
  }

  // Variable global-----------------------------Variable global--------------------------------------------
  global(recintoSeleccionado:string){
    this.variableGlobal.navigateForward(`/recintos/${recintoSeleccionado}`);
  }

  


  // Método para agregar una lista de documentos desde un archivo JSON
  agregarListaDocumentos(coleccion: string, listaDocumentos: any[]) {
    const batch = this.firestore.firestore.batch();
    const collectionRef = this.firestore.collection(coleccion).ref;

    listaDocumentos.forEach(documento => {
      const newDocRef = collectionRef.doc(); // Crea una nueva referencia de documento sin ID
      batch.set(newDocRef, documento); // Agrega el documento al batch
    });

    return batch.commit(); // Ejecuta el batch
  }

  getLocalidades() {
    return this.http.get('assets/data/localidades.json');
  }

  getZonaClimatica(zona:string):Observable<any[]>{
    return this.http.get<any[]>('assets/data/CoefTransmisionCerramientos.json');
  }

  /** *************  ALERTAS ******************* */

  //Proyecto actualizado
  async exitoActualizacionProyecto() {
    const alert = await this.alertControler.create({
      header: 'Actualización',
      message: 'El proyecto se ha actualizado',
      buttons: ['OK']
      
    });
    this.router.navigate(['/proyectos'])
    await alert.present();
  }

  async mostrarErrorActualizacion() {
    const alert = await this.alertControler.create({
      header: 'Error',
      message: 'No se ha podido actualizar el proyecto',
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmarEliminarRecinto() {
    const alert = await this.alertControler.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este recinto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
          
            this.router.navigate(['/proyectos']);
          }
        }
      ]
    });
    await alert.present();
  }
}


