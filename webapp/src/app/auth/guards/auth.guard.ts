import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable(
    {providedIn: 'root'}
)
export class AuthGuard
{
  constructor(
    private authService: AuthService
  ) {}

  canActivate() {
    return this.authService.isAuthenticated();
  }
}

export const privateRoute: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) =>
{
    const guard = inject(AuthGuard);
    const router = inject(Router);

    if (guard.canActivate())
        return true;

    return router.navigateByUrl('/login').then(() => false);
};

export const publicRoute: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) =>
{
    const guard = inject(AuthGuard);
    const router = inject(Router);

    if (!guard.canActivate())
        return true;

    return router.navigateByUrl('/home').then(() => false);
};
