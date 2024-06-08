import { Component, ViewChild } from '@angular/core';
//import { CustomersService } from '../../../../core/services/rest/customers/customers.service';
import { CreatePsychologistDto } from '../../../../core/models/rest/dtos/psychologist/create-psychologist.dto';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../../components/login/login.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { SessionService } from '../../../../core/services/auth/session.service';
import { LoginRequestDto } from '../../../../core/models/rest/dtos/auth/login-request.dto';

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
    private sessionService: SessionService,
    private router: Router
  ) {

  }


  login(loginDto: LoginRequestDto){

    this.authService.login(loginDto).subscribe({
      next: (response) => {
        this.sessionService.isAuthenticated = true;
        this.sessionService.role = loginDto.role;
        switch (loginDto.role) {
          case 'admin':
            this.router.navigate(['/administracion']);
            break;
          case 'psychologist':
            this.router.navigate(['/dashboard']);
            break;
        }
      }
  })
  }
}
