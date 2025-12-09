import { CanActivateFn, Router,CanDeactivate, mapToCanDeactivate } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router
  ) {}
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
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
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}


