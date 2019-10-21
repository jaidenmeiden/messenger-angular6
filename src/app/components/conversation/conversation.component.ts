import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

// Interfaces
import {User} from '../../interfaces/user';

// Servicios
import {UserFirebaseService} from "../../services/user-firebase.service";
import {ConversationService} from "../../services/conversation.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  private friendId: any;
  private user: User;
  private friend: User;
  private conversation_id: string;
  private textMessage: string;
  conversation: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userFirebaseService: UserFirebaseService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService
  ) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    this.authenticationService.getStatus().subscribe((session) => {
      this.userFirebaseService.getUserById(session.uid).valueChanges()
        .subscribe((user: User) => {
            this.user = user;
            this.userFirebaseService.getUserById(this.friendId).valueChanges()
              .subscribe((data: User) => {
                this.friend = data;
                const ids = [this.user.uid, this.friend.uid].sort();
                this.conversation_id = ids.join('|');
                this.getConversation();
              }, (error) => {
                console.log(error);
              });
          });
    });
  }

  ngOnInit() {
  }

  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }

  getConversation() {
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((data) => {
      this.conversation = data;
      this.conversation.forEach((message) => {
        if (!message.seen) {
          message.seen = true;
          this.conversationService.editConversation(message);
          const audio = new Audio('assets/sound/new_message.m4a');
          audio.play();
        }
      });
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  getUserNickById(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }
}
