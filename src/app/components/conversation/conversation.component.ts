import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireStorage} from "@angular/fire/storage";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

  shake: boolean = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;

  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private userFirebaseService: UserFirebaseService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService,
    private angularFireStorage: AngularFireStorage,
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text'
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }

  sendZumbido() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    };
    this.conversationService.createConversation(message).then(() => {});
    this.doZumbido();
  }

  sendImage() {
    const currentPictureId = Date.now();
    const pictures = this.angularFireStorage.ref('conversations/pictures/' + this.conversation_id + '/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
    pictures.then((result) => {
      this.picture = this.angularFireStorage.ref('conversations/pictures/' + this.conversation_id + '/' + currentPictureId + '.jpg').getDownloadURL();
      this.picture.subscribe((image: string) => {
        const message = {
          uid: this.conversation_id,
          timestamp: Date.now(),
          text: image,
          sender: this.user.uid,
          receiver: this.friend.uid,
          type: 'image'
        };
        this.conversationService.createConversation(message).then(() => { });
        this.croppedImage = ''
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  doNewMessage() {
    const audio = new Audio('assets/sound/new_message.m4a');
    audio.play();
  }

  getConversation() {
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((data) => {
      this.conversation = data;
      this.conversation.forEach((message) => {
        if (!message.seen) {
          message.seen = true;
          this.conversationService.editConversation(message);
          if (message.type == 'text') {
            this.doNewMessage();
          } else if (message.type == 'image') {
            this.doNewMessage();
          } else if (message.type == 'zumbido') {
            this.doZumbido();
          }
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
