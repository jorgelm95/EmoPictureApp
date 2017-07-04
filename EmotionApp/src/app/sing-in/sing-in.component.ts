import { Component, OnInit } from '@angular/core';
import {SingInService} from '../Services/sing-in.service';
import {User} from '../Models/User'
import {Route,Router} from '@angular/router';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css'],
  providers:[SingInService]
})
export class SingInComponent implements OnInit {

  user:User;

  constructor(private singService:SingInService, private router:Router) {
    
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
    this.router.navigate(['/home']);
  }

  loginGoogle():void{
    this.singService.singInGoogle();
  }


  navigateHome():void{
    this.router.navigate(['/home']);
  }
   
}
