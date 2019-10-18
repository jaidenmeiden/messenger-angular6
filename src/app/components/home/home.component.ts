import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private users: User[];

  constructor() {
    this.users = [
      {uid: 1, nick: 'Eduardo', subnick: 'Mi mensaje personal', status: 'online', age: 28, email: 'eduardo@platzi.com', friend: true},
      {uid: 2, nick: 'Yuliana', subnick: 'Mi mensaje personal', status: 'busy', age: 25, email: 'yuliana@platzi.com', friend: true},
      {uid: 3, nick: 'Freddy', subnick: 'Mi mensaje personal', status: 'away', age: 28, email: 'freddy@platzi.com', friend: false},
      {uid: 4, nick: 'Jaiden', subnick: 'Mi mensaje personal', status: 'away', age: 32, email: 'jaiden@platzi.com', friend: false},
      {uid: 5, nick: 'Alfredo', subnick: 'Mi mensaje personal', status: 'away', age: 38, email: 'alfredo@platzi.com', friend: true}
    ];
  }

  ngOnInit() {
  }

}
