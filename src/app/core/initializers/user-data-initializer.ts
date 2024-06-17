import { catchError, lastValueFrom, of, switchMap } from 'rxjs';
import { UserManagementService } from '../services/user-management/user-management.service';
import { UserData } from '../models/session/user-data';
import { SessionService } from '../services/auth/session.service';
import { APP_INITIALIZER } from '@angular/core';

function userDataInitializerFactory(userManagementService: UserManagementService, sessionService: SessionService) {
  const loggedUserData: UserData = {} as UserData;
  return () => lastValueFrom(
    userManagementService.getCurrentUser().pipe(
      switchMap((userData) => {
        loggedUserData.role = userData.role;
        loggedUserData.cedula = userData.cedula;
        if (loggedUserData.cedula !== null) {
          return userManagementService.getByIdPsychologist(
            loggedUserData.cedula,
          );
        }
        return of(null);
      }),
      switchMap((psychologistData) => {
        if (psychologistData !== null) {
          loggedUserData.name = psychologistData.name;
          return of(loggedUserData);
        }
        loggedUserData.name = 'Admin';
        return of(null);
      }),
      switchMap(() => {
        sessionService.userData = loggedUserData;
        return of(null);
      }),
      catchError(() => {
        sessionService.logout();
        return of(null);}),
    ),
  );
}

export function provideUserDataInitializer() {
  return {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: userDataInitializerFactory,
    deps: [UserManagementService, SessionService]
  }
}