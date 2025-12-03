import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistorComponent } from './registor/registor.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./registor/registor.component').then(m => m.RegistorComponent)
  },
  {
    path:'dashboard',
    loadComponent:()=>
      import('./dashboard/dashboard.component').then(m=>DashboardComponent)
  }
];