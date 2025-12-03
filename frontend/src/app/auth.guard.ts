import { CanActivateFn,Router } from '@angular/router';
import { Injectable,Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn:'root'
})
export class AuthGuard{
  constructor(private router:Router,
    @Inject(PLATFORM_ID) private platformid:Object
  ){}
  canActivate():boolean{
    if(isPlatformBrowser(this.platformid)){
           const token=localStorage.getItem('token')
    if(token){
      return true
    }
    this.router.navigate(['/login'])
    return false 
    }
   return false;
  }
}