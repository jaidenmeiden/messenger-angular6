import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserFirebaseService} from "../../services/user-firebase.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {User} from "../../interfaces/user";
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;

  constructor(
    private angularFireStorage: AngularFireStorage,
    private userFirebaseService: UserFirebaseService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userFirebaseService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  saveSettings() {
    if(this.croppedImage) { // Se verifica si hay una imagen recortada
      const  currentPictureID = Date.now(); // Se asigna un nombre unico
      // Se sube una imagen covertida a binaria en la ubicación concateneada con el nombre unico
      const  pictures = this.angularFireStorage.ref('pictures/' + currentPictureID + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {// Despues de que se sube se obtiene la URL de esas imagen
        this.picture = this.angularFireStorage.ref('pictures/' + currentPictureID + '.jpg').getDownloadURL();//Se captura la URL entregada
        this.picture.subscribe((image) => {
          this.userFirebaseService.setAvatar(image, this.user.uid).then(() => {//Se busca la proiedad avatar del usuario y se agrega la URL
            alert('Avatar almacenado correctamente');
          }).catch((error) => {
            alert('Hubo un error al subir la imagen');
            console.log(error);
          });
        });
      }).catch( (error) => {
        console.log(error);
      })
    } else {
      this.userFirebaseService.editUser(this.user).then(() => {
        alert('Cambios guardados!');
      }).catch((error) => {
        alert('Hubo un error');
        console.log(error);
      });
    }
  }
}
