import { Router, CanActivate }    from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    if (this.auth.authenticated()) 
   		return true;

	this.router.navigate(['/login']);
	return false;
  }
}