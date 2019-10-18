import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserFirebaseService} from "../../services/user-firebase.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private userFirebaseService: UserFirebaseService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userFirebaseService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  saveSettings() {
    this.userFirebaseService.editUser(this.user).then(() => {
      alert('Cambios guardados!');
    }).catch((error) => {
      alert('Hubo un error');
      console.log(error);
    });
  }
}
