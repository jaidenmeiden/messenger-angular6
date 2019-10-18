import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

// Interfaces
import {User} from '../../interfaces/user';

// Servicios
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';

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
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.users = this.userService.getUsers();
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
