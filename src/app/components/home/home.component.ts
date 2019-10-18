import { Component, OnInit } from '@angular/core';

// Interfaces
import {User} from '../../interfaces/user';

// Servicios
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private users: User[];

  constructor(
    private userService: UserService
  ) {
    this.users = this.userService.getUsers();
  }

  ngOnInit() {
  }

}
