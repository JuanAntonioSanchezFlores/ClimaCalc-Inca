import { Component} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ClimaServiceService } from '../clima-service.service';
import { AppComponent } from "../app.component"
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
})
export class LoginAdminPage {

  email:string = '';
  password:string = '';
  rememberPassword:boolean= false;
  items!: any[];

  constructor(private firestore:AngularFirestore, private consulta:ClimaServiceService, private componente:AppComponent,
              private router:Router, private alertController: AlertController) { }

  login(email: string, password: string) {
    this.firestore.collection('administrador').get()
      .subscribe(snapshot => {
        let found = false;
        snapshot.forEach(doc => {
          const data:any = doc.data();
          if (data.email === email && data.password === password) {
            found = true;

            
            this.router.navigate(['/proyectos',{ email: email }])

            console.log('Se encuentra el documento en la base de datos')
          }

        });
        if (!found) {
          this.alertaUsuarioNoRegistrado()

        }
      });
  }


  agregarLocalidades() {
    this.consulta.getLocalidades().subscribe((data: any) => {
      data.forEach((localidad: any) => {
        this.firestore.collection('localidades').add(localidad)
          .then((docRef) => {
            console.log('Documento agregado con ID: ', docRef.id);
          })
          .catch((error) => {
            console.error('Error al agregar documento: ', error);
          });
      });
    });
  }

  async alertaUsuarioNoRegistrado() {
    const alert = await this.alertController.create({
      header: 'Usuario no registrado',
      message: 'El usuario no se encuentra registrado en el sistema.',
      buttons: ['OK']
    });

    await alert.present();
  }

}




