import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistorComponent } from './registor/registor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLogin } from './auth.guard';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    canActivate: [AuthGuardLogin],
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./registor/registor.component').then((m) => m.RegistorComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./create/create.component').then((m) => m.CreateComponent),
  },
  {
    path: 'create/:id',
    canActivate:[AuthGuard],
    loadComponent:()=>
      import('./create/create.component').then((m)=>m.CreateComponent),
  }
 
];
