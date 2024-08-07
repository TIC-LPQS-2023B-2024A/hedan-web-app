import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginFormComponent } from '../../components/login/login.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { SessionService } from '../../../../core/services/auth/session.service';
import { LoginRequestDto } from '../../../../core/models/rest/dtos/auth/login-request.dto';
import { of, switchMap } from 'rxjs';
import { UserManagementService } from '../../../../core/services/user-management/user-management.service';
import { UserData } from '../../../../core/models/session/user-data';
import { AlertComponent } from "../../../../shared/components/alert/alert.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, AlertComponent],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss',
})
export class LoginPageComponent {
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'danger';


  constructor(
    private authService: AuthService,
    private userManagementService: UserManagementService,
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  login(loginDto: LoginRequestDto) {

    this.alertMessage = null;
    this.alertType = 'danger';

    const loggedUserData: UserData = {} as UserData;

    this.authService
      .login(loginDto)
      .pipe(
        switchMap(() => this.userManagementService.getCurrentUser()),
        switchMap((userData) => {
          loggedUserData.role = userData.role;
          loggedUserData.cedula = userData.cedula;
          if (loggedUserData.cedula !== null) {
            return this.userManagementService.getByIdPsychologist(
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
      )
      .subscribe({
        next: async() => {
          this.sessionService.userData = loggedUserData;
          this.showAlert('Ingreso exitoso', 'success');
          await wait(3000);


          const queryParams: Params = {};
          this.route.snapshot.queryParamMap.keys.forEach((key) => {
            if (key !== 'returnUrl') {
              queryParams[key] = this.route.snapshot.queryParamMap.get(key)!;
            }
          });
          const queryReturnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          const dashboardRoute = '/dashboard';
          const adminRoute = '/administracion/lista-psicologos';

          let nextUrl = '';
          if (queryReturnUrl !== null) {
            nextUrl = queryReturnUrl;
          } else {
            nextUrl =
              this.sessionService.userData!.role === 'admin'
                ? adminRoute
                : dashboardRoute;
          }

          this.router.navigate([nextUrl]);
        },
        error: () => {
          this.showAlert('Credenciales incorrectas, intenta nuevamente', 'danger');
        }
      });
  }

  showAlert(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertType = type;
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
