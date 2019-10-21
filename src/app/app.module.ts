import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import {ImageCropperModule} from "ngx-image-cropper";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BootstrapModalModule} from "ng2-bootstrap-modal";

// Se importan pipes
import { SearchPipe } from './pipes/search.pipe';

// Se importa guard
import {AuthenticationGuard} from "./guards/authentication.guard";

// Se importan componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { MenuComponent } from './components/menu/menu.component';
import { RequestComponent } from './components/modals/request/request.component';
import { ContactComponent } from './components/contact/contact.component';

// Rutas
const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'conversation/:uid', component: ConversationComponent, canActivate: [AuthenticationGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    ConversationComponent,
    MenuComponent,
    RequestComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    ImageCropperModule,
    NgbModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RequestComponent]
})
export class AppModule { }
