import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

// Interfaces
import {User} from '../../interfaces/user';

// Servicios
import {AuthenticationService} from '../../services/authentication.service';
import {UserFirebaseService} from "../../services/user-firebase.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private users: User[];
  private query: string;
  private content: string;

  constructor(
    public router: Router,
    private userFirebaseService: UserFirebaseService,
    private authenticationService: AuthenticationService
  ) {
    this.userFirebaseService.getUsers().valueChanges()
      .subscribe((data: User[]) => {
        this.users = data;
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

  setUserProperty(property, status) {

  }
  open(contenido) {

  }
  logOut() {
    this.authenticationService.logOut().then(() => {
      this.router.navigate(['login']);
    });
  }

}
