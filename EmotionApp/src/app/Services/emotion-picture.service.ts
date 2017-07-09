import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import "rxjs/add/operator/map";

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

comments:FirebaseListObservable<any[]>;

face:any;
score:any;


listPictures:FirebaseListObservable<EmoPicture[]>;

coment:any;

key:string="784edfbff25346e585cdd8dce6600aaa";
urlServiceEndPoint: any="https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?";
progresBar:Number;
  constructor(private http:Http, private af:AngularFireDatabase) {
    //this.inicializateEmoPictureModel();
    this.face=[];
    this.score=[];
    this.coment =[{UserComment:"",Comment:"", UrlPhotoUserCOment:""}];


  }


inicializateEmoPictureModel():void{
  /*
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
  }*/
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

      if (imageObject.length >0){
        imageObject.forEach(element=>{
         this.face.push({'Top':Number(element.faceRectangle.top),'Left':Number(element.faceRectangle.left),
          'Width':Number(element.faceRectangle.width),'Height':Number(element.faceRectangle.height) });

          this.score.push({'Anger': Number((element.scores.anger*100)).toFixed(2),'Contempt':Number((element.scores.contempt*100)).toFixed(2),
          'Disgust':Number((element.scores.disgust*100)).toFixed(2),'Fear':Number(element.scores.fear).toFixed(2),'Happiness':Number((element.scores.happiness*100)).toFixed(2),
          'Neutral':Number((element.scores.neutral*100)).toFixed(2),'Sadness':Number((element.scores.sadness*100)).toFixed(2),
          'Surprise':Number((element.scores.surprise*100)).toFixed(2)});
      });

      }else{
        console.log("no hayb registros para insertar")
      }

      this.emoPicture ={
        Username: String(userinfo.Name),
        Email: String(userinfo.Email),
        UrlPhotoUserSesion: String(userinfo.URlPhoto),
        UrlImage: String(imagenurl),
        FaceRectangle:this.face,
        Scores:this.score,
        Comments:this.coment

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


getAllPictures():FirebaseListObservable<EmoPicture[]>{
 return this.listPictures = this.af.list('/emopictureapp');
  
}

addComentsToEmoPicture(key:any,user:string,urlPhotoUser:string,commenta:String){
 let pictures= this.af.list('/emopictureapp/'+key+'/Comments');
 let comment:any={
  UserComment:user,
  Comment:commenta,
  UrlPhotoUserCOment:urlPhotoUser
};
 
 pictures.push(comment);

}

getComments(key:any):FirebaseListObservable<any[]>{
  return this.comments = this.af.list('/emopictureapp/'+key+'/Comments');
}
deleteEmoPicture(key:any){
  let picture = this.af.list('/emopictureapp');
  picture.remove(key);
}

}
