import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {UserFirebaseService} from "../../services/user-firebase.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() opcion: string;
  @Input() uid: string;
  contact: User;
  constructor(
    private userFirebaseService: UserFirebaseService,
  ) { }

  ngOnInit() {
    console.log(this.uid);
    this.userFirebaseService.getUserById(this.uid).valueChanges().subscribe((data: User) => {
      this.contact = data;
    });
  }

}
