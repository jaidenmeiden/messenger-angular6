import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

// Interfaces
import {User} from '../../interfaces/user';

// Servicios
import {AuthenticationService} from '../../services/authentication.service';
import {UserFirebaseService} from "../../services/user-firebase.service";
import {RequestsService} from '../../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private friends: User[];
  private query: string = '';
  private friendEmail: string = '';
  private user: User;

  constructor(
    public router: Router,
    private userFirebaseService: UserFirebaseService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private requestsService: RequestsService
  ) {
    this.userFirebaseService.getUsers().valueChanges()
      .subscribe((data: User[]) => {
        this.friends = data;
      }, (error) => {
        console.log(error);
      });
    this.authenticationService.getStatus().subscribe((status) => {
      this.userFirebaseService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
      });
    });
  }

  ngOnInit() {
  }

  setUserProperty(property, status) {

  }
  logOut() {
    this.authenticationService.logOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }
  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    };
    this.requestsService.createRequest(request).then(() => {
      alert('Solicitud Enviada');
    }).catch((error) => {
      alert('Hubo un error');
      console.log(error);
    });
  }

}
