import {Routes} from '@angular/router';

import {SingInComponent} from '../sing-in/sing-in.component';



export const AppRoute:Routes =[
    {path:'login',component:SingInComponent},
    {path:'',component:SingInComponent},
]