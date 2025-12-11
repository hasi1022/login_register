import { CanActivateFn, Router,CanDeactivate, mapToCanDeactivate } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router
  ) {}
  canActivate(): boolean {
    const token = localStorage.getItem('token');
   
    if (!token) {
      this.router.navigate(['/login']);
       return false; 
    }
    try{
        return  true;  
    }
  
    catch(err){
       localStorage.removeItem('token');
       return false;
    }
    
  }
}
@Injectable({
  providedIn: 'root',
})
export class AuthGuardLogin {
  constructor(
    private router: Router
  ) {}
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecode:any=jwtDecode(token)
      if(tokenDecode.role==="admin"){
        this.router.navigate(['/admin'])
      }
      else{
        this.router.navigate(['/dashboard'])
        return false
      }
      
    }
    return true;
  }
}
@Injectable({
  providedIn:'root',
})
export class AuthGuardAdmin{
  constructor(private router:Router){}
  canActivate():boolean{
    const token=localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login'])
      return false;
    }
    try{
      const tokenDecode:any=jwtDecode(token);
      if(tokenDecode.role==="admin"){
        return true
      }
      else{
        this.router.navigate(['/login'])
        return false
      }
    }
    catch(err){
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
      return false;
    }
  }
}


