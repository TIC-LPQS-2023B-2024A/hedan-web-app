import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../../components/login/login.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { SessionService } from '../../../../core/services/auth/session.service';
import { LoginRequestDto } from '../../../../core/models/rest/dtos/auth/login-request.dto';
import { of, switchMap } from 'rxjs';
import { UserManagementService } from '../../../../core/services/user-management/user-management.service';
import { UserData } from '../../../../core/models/session/user-data';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss',
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private userManagementService: UserManagementService,
    private sessionService: SessionService,
    private router: Router
  ) {

  }

  login(loginDto: LoginRequestDto){
    const loggedUserData: UserData = {} as UserData;

    this.authService.login(loginDto)
    .pipe(
      switchMap(() => this.userManagementService.getCurrentUser()),
      switchMap((userData) => {
        loggedUserData.role = userData.role;
        loggedUserData.cedula = userData.cedula;
        if(loggedUserData.cedula !== null) {
          return this.userManagementService.getByIdPsychologist(loggedUserData.cedula);
        }
        return of(null);
      }),
      switchMap((psychologistData) => {
        if(psychologistData !== null) {
          loggedUserData.name = psychologistData.name;
          return of(loggedUserData);
        }
        loggedUserData.name = "Admin";
        return of(null);
      })
    )
    .subscribe({
      next: () => {
        this.sessionService.userData = loggedUserData;
        switch (this.sessionService.userData.role) {
          case 'admin':
            this.router.navigate(['/administracion/lista-psicologos']);
            break;
          case 'psychologist':
            this.router.navigate(['/dashboard']);
            break;
        }
      }
  })
  }
}
