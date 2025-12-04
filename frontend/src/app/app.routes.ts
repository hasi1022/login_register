import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistorComponent } from './registor/registor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLogin } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full' },

  {
    path: 'login',
    canActivate:[AuthGuardLogin],
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
    canActivate:[AuthGuard],
    loadComponent:()=>
      import('./dashboard/dashboard.component').then(m=>DashboardComponent)
  }
];