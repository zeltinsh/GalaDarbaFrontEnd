import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'main', component: Main }
    
];
