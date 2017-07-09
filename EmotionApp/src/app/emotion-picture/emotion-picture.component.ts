import { Component, OnInit,Input } from '@angular/core';
import{Http} from '@angular/http';
import * as firebase  from 'firebase';
import {AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import {BrowserModule} from '@angular/platform-browser';
import {FormBuilder,FormGroup} from '@angular/forms';

import {EmoPicture} from '../Models/EmoPicture';

import {EmotionPictureService} from '../Services/emotion-picture.service'
 
@Component({
  selector: 'app-emotion-picture',
  templateUrl: './emotion-picture.component.html',
  styleUrls: ['./emotion-picture.component.css'],
  providers:[EmotionPictureService]
})

export class EmotionPictureComponent implements OnInit {

  coments:FirebaseListObservable<any[]>;

  hidenComment:boolean=true;
  @Input() emoPicture:any;
 comentForm:FormGroup;

  constructor(private emoSerive:EmotionPictureService,private fb:FormBuilder) { 
        this.comentForm = this.fb.group({
          comentario:''
    });
  }

  ngOnInit() {
    console.log("este es emoPicture" + this.emoPicture);
    console.log(this.emoPicture);
    console.log(this.emoPicture.Comments);
     console.log("correo", this.comentForm.controls.comentario.value);
    this.coments = this.emoSerive.getComments(this.emoPicture.$key);

  }

  addComentToEmoPicture(){

  }


  showAddComent():void{
    if(this.hidenComment==false){
      this.hidenComment=true;
    }else if(this.hidenComment==true){
      this.hidenComment = false;
    }
  }

  publicComment(key:any,user:string,urlPhotoUser:string):void{
    let commenta = this.comentForm.controls.comentario.value;
    this.emoSerive.addComentsToEmoPicture(key,user,urlPhotoUser,commenta);
  }

  deleteEmoPicture(key:any):void{
    this.emoSerive.deleteEmoPicture(key);
  }
  onSubmit(value:any){
    console.log(value);
  }
  DetailEmoPicture(){
    
  }



}
