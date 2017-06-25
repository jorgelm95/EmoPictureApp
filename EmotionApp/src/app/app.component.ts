import { Component, OnInit } from '@angular/core';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {storage} from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'app';
  
    constructor(public db: AngularFireDatabase) {
    
  }

  private basePath ='/Pictures';
  private uploadTask: firebase.storage.UploadTask;

    upload() {
        // Create a root reference
        let name:String="";
        var  selectedFile = [(<HTMLInputElement>document.getElementById('file')).files[0]];
        name=selectedFile[0].name;
        let storageRef = firebase.storage().ref();
        this.uploadTask = storageRef.child(`${this.basePath}/${name}`).put(selectedFile[0]);
        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) =>{
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
          
        }
        )
        
    }


}


