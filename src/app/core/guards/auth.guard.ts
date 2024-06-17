/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Params,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SessionService } from '../services/auth/session.service';

export const loginGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  const router = inject(Router);
  const sessionService = inject(SessionService);

  const isLoggedIn = sessionService.isAuthenticated;
  if (!isLoggedIn) {
    const returnUrl = state.url.split('?')[0];
    const queryParams = new URLSearchParams(state.url.split('?')[1]);
    queryParams.append('returnUrl', returnUrl);

    const queryParamsObject: Params = {};

    queryParams.forEach((value: string, key: string) => {
      queryParamsObject[key] = value;
    });

    router.navigate(['/login'], {
      queryParams: queryParamsObject,
    });
  }
  return isLoggedIn;
};

export const redirectToMainPageGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
): boolean => {
  const router = inject(Router);
  const sessionService = inject(SessionService);

  const queryParams: Params = {};
  route.queryParamMap.keys.forEach((key) => {
    if (key !== 'returnUrl') {
      queryParams[key] = route.queryParamMap.get(key)!;
    }
  });
  const queryReturnUrl = route.queryParamMap.get('returnUrl');
  const dashboardRoute = '/dashboard';
  const adminRoute = '/administracion/lista-psicologos';

  let nextUrl = '';
  if (queryReturnUrl !== null) {
    nextUrl = queryReturnUrl;
  } else {
    nextUrl =
      sessionService.userData?.role === 'admin' ? adminRoute : dashboardRoute;
  }

  const isLoggedIn = sessionService.isAuthenticated;
  if (isLoggedIn) {
    router.navigate([nextUrl], { queryParams: queryParams });
  }
  return !isLoggedIn;
};

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  if (sessionService.userData?.role === null) {
    router.navigate(['/']);
    return false;
  }

  const hasPermission = (route.data['requiredRoles'] as string[]).includes(
    sessionService.userData!.role,
  );
  if (!hasPermission) {
    router.navigate([
      sessionService.userData?.role === 'admin'
        ? '/administracion/lista-psicologos'
        : '/dashboard',
    ]);
  }
  return hasPermission;
};
