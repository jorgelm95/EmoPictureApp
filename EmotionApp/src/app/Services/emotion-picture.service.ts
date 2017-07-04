import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable'

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {storage} from 'firebase';
import * as firebase from 'firebase';

import {SingInService} from '../Services/sing-in.service';
import {EmoPicture} from '../Models/EmoPicture';
import {Progres} from '../Models/Progress';

@Injectable()
export class EmotionPictureService {

emoPicture:EmoPicture;
pictures: FirebaseListObservable<any[]>;

listPictures:FirebaseListObservable<EmoPicture[]>;
key:string="784edfbff25346e585cdd8dce6600aaa";
urlServiceEndPoint: any="https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?";
progresBar:Number;
  constructor(private http:Http, private af:AngularFireDatabase) {
    this.inicializateEmoPictureModel();
   }


inicializateEmoPictureModel():void{
   this.emoPicture ={
      Username:'',
       Email:'',
       UrlPhotoUserSesion:'',
       UrlImage:'',
       FaceRectangle: [{
      "Top": 0,
      "Left": 0,
      "Width": 0,
      "Height": 0
    }],
    Scores: [{
      "Anger": 0,
      "Contempt": 0,
      "Disgust": 0,
      "Fear": 0,
      "Happiness": 0,
      "Neutral": 0,
      "Sadness": 0,
      "Surprise": 0
    }],
    Comments:[{
      UserComment:"",
      Comment:"",
      UrlPhotoUserCOment:""
    }] 
  }
}

 private basePath ='/Pictures';
private uploadTask: firebase.storage.UploadTask;

uploadImageToFirebase(file:any, progres:Progres, userinfo:any) {
        // Create a root reference
        let name:string="";
        
        var  selectedFile = file;
        name=selectedFile.name;
       // let storageRef = firebase.storage().ref();
        this.uploadTask = firebase.storage().ref(name).put(selectedFile);
        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) =>{
            progres.Progres = (snapshot.bytesTransferred / snapshot.totalBytes)*100;  
            console.log("Archivo cargandose");

          },
          (error) =>{
            console.log("Archivo no cargado");
          },
          ()=>{
             console.log("Achivo cargado con extio");
             console.log("url imagen"+ this.uploadTask.snapshot.downloadURL);
             console.log("nombre archivo"+ this.uploadTask.snapshot.state); 
             console.log("nombre archivo"+ this.uploadTask.snapshot.metadata.timeCreated); 
            
             this.callImageCognitveEmotionService(this.uploadTask.snapshot.downloadURL).subscribe(
              (res)  =>{
                   console.log(res.json());
                   let data = res.json();
                  this.SaveitemInfirebase(userinfo,data,this.uploadTask.snapshot.downloadURL);
                },
                (e)=>{
                  console.log(e);
                }
             )

          
        }
        )
        
    }

SaveitemInfirebase(userinfo:any,imageObject:any,imagenurl:string):void{
      this.emoPicture.Username=userinfo.Name;
      this.emoPicture.Email = userinfo.Email;
      this.emoPicture.UrlPhotoUserSesion = userinfo.PhotoURL;
      this.emoPicture.UrlImage= imagenurl;
      if (imageObject.length >0){
        imageObject.forEach(element=>{
          this.emoPicture.FaceRectangle.push({'Top': element.faceRectangle.top,'Left':element.faceRectangle.left,
          'Width':element.faceRectangle.width,'Height':element.faceRectangle.height });

          this.emoPicture.Scores.push({'Anger': element.scores.anger,'Contempt':element.scores.contempt,'Disgust':element.scores.disgust,
          'Fear':element.scores.fear,'Happiness':element.scores.happiness,'Neutral':element.scores.neutral,
          'Sadness':element.scores.sadness,'Surprise':element.scores.surprise});
      });

      }else{
        console.log("no hayb registros para insertar")
      }

    

      

      this.pictures = this.af.list('/emopictureapp');
      this.pictures.push(this.emoPicture);
}

callImageCognitveEmotionService(urlImage:string):Observable<Response>{
 let headers = new Headers();
 headers = new Headers();
 headers.append("Content-Type","application/json");
 headers.append("Ocp-Apim-Subscription-Key",this.key);

 let params:any={

 };
 /*
 let data : any={
   url:'https://firebasestorage.googleapis.com/v0/b/emopictureapp.appspot.com/o/Pictures%2Fimagen020.jpg?alt=media&token=34658a61-6cfa-4e14-ae3a-619b01128f1e'
 }
*/
  let data : any={
   url:urlImage
 }
 console.log(JSON.stringify(data));
 return this.http.post(this.urlServiceEndPoint,JSON.stringify(data),{
   headers:headers
 }

 );
}


GetAllPictures():FirebaseListObservable<EmoPicture[]>{
 return this.listPictures = this.af.list('/emopictureapp');
  
}

}
