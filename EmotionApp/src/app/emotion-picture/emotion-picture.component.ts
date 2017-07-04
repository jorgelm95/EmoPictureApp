import { Component, OnInit,Input } from '@angular/core';
import{Http} from '@angular/http';
import * as firebase  from 'firebase';
import {AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';


import {EmoPicture} from '../Models/EmoPicture';

import {EmotionPictureService} from '../Services/emotion-picture.service'
 
@Component({
  selector: 'app-emotion-picture',
  templateUrl: './emotion-picture.component.html',
  styleUrls: ['./emotion-picture.component.css'],
  providers:[EmotionPictureService]
})

export class EmotionPictureComponent implements OnInit {

  @Input() emoPicture:any;

  constructor() { 
    
  }

  ngOnInit() {
    console.log("este es emoPicture" + this.emoPicture);
    console.log(this.emoPicture);
  }



}
