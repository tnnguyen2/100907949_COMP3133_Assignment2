import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authenticationService.isAuthenticated().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true; // Allow access to the route
        } else {
          // Redirect to the login page
          this.router.navigate(['/login']);
          return false; // Prevent access to the route
        }
      })
    );
  }
}
