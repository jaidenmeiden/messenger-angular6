import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

// Interfaces
import {User} from '../../interfaces/user';

// Servicios
import {UserFirebaseService} from "../../services/user-firebase.service";

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
    private userFirebaseService: UserFirebaseService,
  ) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.userFirebaseService.getUserById(this.friendId).valueChanges()
      .subscribe((data: User) => {
        this.user = data;
      }, (error) => {
        console.log(error);
      });
    console.log(this.user);
  }

  ngOnInit() {
  }

}
