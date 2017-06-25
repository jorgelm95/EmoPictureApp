import { Component, OnInit } from '@angular/core';
import {SingInService} from '../sing-in/sing-in.service';
import {User} from '../Models/User'


@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css'],
  providers:[SingInService]
})
export class SingInComponent implements OnInit {

  user:User;

  constructor(private singService:SingInService) {
    
   }

  ngOnInit() {
   this.checkStateUser();
   console.log("Usuario actual" +this.user);
  }

  checkStateUser():User{
    
   return this.user = this.singService.chekStateUser();
  
  }

  loginFacebook():void{
    this.singService.sinIngFacebook();
  }

  loginGoogle():void{
    this.singService.singInGoogle();
  }

  saveItem(){
    this.singService.saveItemInfirebase();
  }
}
