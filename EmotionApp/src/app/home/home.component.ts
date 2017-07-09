import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';

import {EmotionPictureService} from '../Services/emotion-picture.service';
import {Progres} from '../Models/Progress';
import {SingInService} from '../Services/sing-in.service';
import {User} from '../Models/User';
import {EmoPicture} from '../Models/EmoPicture';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[EmotionPictureService]
})
export class HomeComponent implements OnInit {
  progresBar:Number =50;
  progres:Progres;
  userinfo:User;
  user:any;
  file:any;
  listPictures:FirebaseListObservable<EmoPicture[]>;

  constructor(private emoService:EmotionPictureService, private sinService:SingInService) { 
   
       this.progres = new Progres();
   
  }

  ngOnInit() {
    this.user = this.sinService.chekStateUser();
    this.user.subscribe(
      (auth)=>{

        this.userinfo ={
          Name: String(auth.displayName),
          Email:String(auth.email),
          URlPhoto:String(auth.photoURL),
          FacebookID:''
        }
      }
    )
     this.progres.Progres =0;

    this.listPictures= this.emoService.getAllPictures();
   
    console.log("datos desde fb");
    console.log(this.listPictures);
  }

  uploadImage():void{

    this.file = [(<HTMLInputElement>document.getElementById('file')).files[0]];
    this.emoService.uploadImageToFirebase(this.file[0],this.progres, this.userinfo);
  }

  getKey(key:any){
    console.log(key);
  }

  getpicture(picture:any){
    console.log(picture);
  }


}
