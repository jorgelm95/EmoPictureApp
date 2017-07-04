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

}
