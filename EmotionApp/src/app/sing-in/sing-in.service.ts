import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import {User} from '../Models/User';

@Injectable()
export class SingInService {
  user: Observable<firebase.User>;
  pictures: FirebaseListObservable<any[]>;
  public userInfo:any={
    Name:'',
    Email:'',
    PhotoURL:''
  };
  constructor(private afuth:AngularFireAuth, private af:AngularFireDatabase) {
   this.chekStateUser();
   console.log(this.user);
  }

   


   chekStateUser():User{
    this.user = this.afuth.authState;
    this.user.subscribe(
      (auth)=>{
        this.userInfo.Name = auth.displayName;
        this.userInfo.Email = auth.email;
        this.userInfo.PhotoURL = auth.photoURL;
       
      }
    )
     return this.userInfo;
   }

   sinIngFacebook(){
      this.afuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
   }

   singInGoogle(){
     this.afuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   }

   saveItemInfirebase(){

     let pictureInfo ={
       Username:'Jorge',
       Email:'jomenco',
       UrlPhotoUserSesion:'jorge95',
       FaceRectangle: {
      "Top": 99,
      "Left": 251,
      "Width": 221,
      "Height": 221
    },
    Scores: {
      "Anger": 0.0005562436,
      "Contempt": 0.160695374,
      "Disgust": 0.007519078,
      "Fear": 8.904218E-05,
      "Happiness": 0.4577624,
      "Neutral": 0.258747756,
      "Sadness": 0.114284635,
      "Surprise": 0.000345479
    },
    Comments:[{
      UserComment:"jorhe",
      Comment:"fggf",
      UrlPhotoUserCOment:"fgfgf"
    }]

     }
      this.pictures = this.af.list('/emopictureapp');
      this.pictures.push(pictureInfo);
      
   }

}
