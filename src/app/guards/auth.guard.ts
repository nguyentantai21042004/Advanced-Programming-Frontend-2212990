import { Injectable, inject } from '@angular/core';
import { UserResponse } from '../responses/user/user.response';
import { TokenService } from '../service/token.service';
import { CanActivateFn, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  userResponse?: UserResponse | null;
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isTokenExpired = this.tokenService.isTokenExpired();
    const isUserIdValid = this.tokenService.getUserId() > 0;
    debugger;
    if (!isTokenExpired && isUserIdValid) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const AuthGuardFn: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  debugger;
  return inject(AuthGuard).canActivate(next, state);
};
