 
import { Injectable, inject } from '@angular/core';

import { ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot } from '@angular/router'; 

import { AuthService } from './auth.service';

/*
@Injectable()
class AuthGuard2 impleme {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
} 
*/


export function authGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  // Check if user is authenticated
  const authService = inject(AuthService);
  const router = inject(Router);
  let isAuthenticated:boolean = false; 
  
  if (authService.isAuth()) {
    isAuthenticated =  true;
  } else {
    isAuthenticated = false;
  }

  
  // Return true if authenticated, otherwise false
  return isAuthenticated;
}
