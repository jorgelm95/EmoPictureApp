import {Routes} from '@angular/router';

import {SingInComponent} from '../sing-in/sing-in.component';
import {HomeComponent} from '../home/home.component';
import {CardPictureComponent} from '../card-picture/card-picture.component';
import {CardPictureDetailComponent} from '../card-picture-detail/card-picture-detail.component';
import {ComentsComponent} from '../coments/coments.component';


export const AppRoute:Routes =[
    {path:'login',component:SingInComponent},
    {path:'home', component:HomeComponent},
    {path:'card', component:CardPictureComponent},
    {path:'detail-card/:key', component:CardPictureDetailComponent},
    {path:'comments', component:ComentsComponent},
    {path:'',component:SingInComponent},
    {path:'**',component:SingInComponent},
    
]