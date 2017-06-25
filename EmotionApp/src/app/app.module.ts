import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';

import {AngularFireModule} from 'angularfire2'
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule,AngularFireAuthProvider, AUTH_PROVIDERS} from 'angularfire2/auth';
import {RouterModule,Route} from '@angular/router';
import { AppComponent } from './app.component';
import { SingInComponent } from './sing-in/sing-in.component';
import {SingInService} from './sing-in/sing-in.service';


export const firebaseConfig={
  apiKey: "AIzaSyBS1xQICAfvBHIIS_F15rAYO6FOcFQWHUo",
    authDomain: "emopictureapp.firebaseapp.com",
    databaseURL: "https://emopictureapp.firebaseio.com",
    projectId: "emopictureapp",
    storageBucket: "emopictureapp.appspot.com",
    messagingSenderId: "946735741045"
}


/** archivo de rutas de la app */
import {AppRoute} from './Commons/Routes';
import { ComentsComponent } from './coments/coments.component';
import { EmotionPictureComponent } from './emotion-picture/emotion-picture.component';



@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    ComentsComponent,
    EmotionPictureComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    RouterModule.forRoot(AppRoute)
  ],
  providers: [SingInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
