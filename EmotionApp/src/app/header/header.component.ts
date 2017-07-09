import { Component, OnInit } from '@angular/core';
import{SingInService} from '../Services/sing-in.service';
import {User} from '../Models/User';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[SingInService]
})
export class HeaderComponent implements OnInit {

  user:any;
  userInfo:User;
  disableInicarSesion:boolean=false;
  diasablePerfil:boolean=false;
  disableHome:boolean=false;

  constructor(private singService:SingInService, private route:Router) {
    
   }

  ngOnInit() {

    this.user = this.singService.chekStateUser();

    this.user.subscribe(
      (auth)=>{

        this.userInfo ={
          Name: String(auth.displayName),
          Email:String(auth.email),
          URlPhoto:String(auth.photoURL),
          FacebookID:''
        }
        
           if(this.userInfo.Name=="" || this.userInfo.Email==""){
            this.diasablePerfil = true;
            this.disableHome = true;
            this.route.navigate(['login']);

          }else{
            this.disableInicarSesion=true
          }
      }
    )
  }

  singOut(){
    this.singService.signOut();
    this.route.navigate(['login']);
  }

  redirecLogin(){
    if(this.userInfo.Name=="" || this.userInfo.Email==""){
      this.route.navigate(['login']);
    }else{
      this.route.navigate(['home']);
    }
  }



}
