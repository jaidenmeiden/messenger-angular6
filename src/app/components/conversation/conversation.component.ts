import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

// Interfaces
import {User} from '../../interfaces/user';

// Servicios
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  private friendId: any;
  private user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.user = this.userService.getUserById(this.friendId);
    console.log(this.user);
  }

  ngOnInit() {
  }

}
