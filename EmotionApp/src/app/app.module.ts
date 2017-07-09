import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import {AngularFireModule} from 'angularfire2'
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule,AngularFireAuthProvider, AUTH_PROVIDERS} from 'angularfire2/auth';
import {RouterModule,Route} from '@angular/router';

/** componentes of the app */

import { AppComponent } from './app.component';
import { SingInComponent } from './sing-in/sing-in.component';

import { ComentsComponent } from './coments/coments.component';
import { EmotionPictureComponent } from './emotion-picture/emotion-picture.component';
import { HomeComponent } from './home/home.component';
import { CardPictureComponent } from './card-picture/card-picture.component';
import { CardPictureDetailComponent } from './card-picture-detail/card-picture-detail.component';


/** infinite scroll */

//import {InfiniteScrollModule} from 'angular2-infinite-scroll';

/** Services of the app */
import {SingInService} from './Services/sing-in.service';
import {EmotionPictureService} from './Services/emotion-picture.service'
 
/**
 * configuration of firebase app */ 
export const firebaseConfig={
  apiKey: "AIzaSyBS1xQICAfvBHIIS_F15rAYO6FOcFQWHUo",
    authDomain: "emopictureapp.firebaseapp.com",
    databaseURL: "https://emopictureapp.firebaseio.com",
    projectId: "emopictureapp",
    storageBucket: "emopictureapp.appspot.com",
    messagingSenderId: "946735741045"
}


/** file of  rutas de la app */
import {AppRoute} from './Commons/Routes';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    ComentsComponent,
    EmotionPictureComponent,
    HomeComponent,
    CardPictureComponent,
    CardPictureDetailComponent,
    NavBarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoute)
   // InfiniteScrollModule
  ],
  providers: [SingInService,EmotionPictureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
