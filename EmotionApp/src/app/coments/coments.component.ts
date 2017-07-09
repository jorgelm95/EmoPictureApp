import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.css']
})
export class ComentsComponent implements OnInit {

  constructor() { }


@Input() comment:any;

  ngOnInit() {
    console.log(this.comment);
  }
  

}
