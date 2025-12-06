import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Login } from './login/login';
import { Header } from './header/header';
import { ManiPasakumi } from './mani-pasakumi/mani-pasakumi';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'header', component: Header },
  { path: 'main', component: Main },
  { path: 'mani-pasakumi', component: ManiPasakumi }
  
    
];
