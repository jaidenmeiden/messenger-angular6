import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {DialogService} from 'ng2-bootstrap-modal';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {RequestsService} from './services/requests.service';
import {User} from './interfaces/user';
import {RequestComponent} from "./components/modals/request/request.component";
import {UserFirebaseService} from "./services/user-firebase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Platzinger';
  user: User;
  requests: any[] = [];
  mailsShown: any[] = [];

  constructor(
    public router: Router,
    private authenticationService: AuthenticationService,
    private userFirebaseService: UserFirebaseService,
    private requestService: RequestsService,
    private dialogService: DialogService
  ) {
    this.authenticationService.getStatus().subscribe((status) => {
      if(status != null) {
        this.userFirebaseService.getUserById(status.uid).valueChanges().subscribe( (data: User) => {// Se obtine el usuario en la sesión abierta
          this.user = data;
          this.requestService.getRequestsForEmail(this.user.email).valueChanges().subscribe((requests: any) => {// Se llaman a los request que hayan llegado
            this.requests = requests;
            this.requests = this.requests.filter( (r) => {//Se filtran los request que no hayan sido aceptadas o rechazadas
              return r.status !== 'accepted' && r.status !== 'rejected';
            });
            this.requests.forEach((request) => {// Recorrer las solicitudes validas
              if (this.mailsShown.indexOf(request.sender) === -1) {
                this.mailsShown.push((request.sender));
                this.dialogService.addDialog(RequestComponent, {scope: this, currentRequest: request});
              }
            });
          }, (error) => {
            console.log(error);
          });
        });
      }
    });
  }
}
