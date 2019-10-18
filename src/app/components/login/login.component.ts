import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {error} from "util";
import {UserFirebaseService} from "../../services/user-firebase.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation: string = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;

  constructor(
    private authenticationService: AuthenticationService,
    private userFirebaseService: UserFirebaseService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password)
      .then((data) => {
        alert('Loggueado correctamente!');
        console.log(data);
      }).catch((error) => {
        alert('Ocurrio un error!');
        console.log(error);
      });
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password)
      .then((data) => {
        const user = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick
        };
        this.userFirebaseService.createUser(user)
          .then((dataDB) => {
            alert('Registrado correctamente!');
            console.log(dataDB);
          }).catch((error) => {
            alert('Ocurrio un error al almacenar información!');
            console.log(error);
          });
      }).catch((error) => {
      alert('Ocurrio un error!');
      console.log(error);
    });
  }

}
