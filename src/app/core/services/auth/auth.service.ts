import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginRequestDto } from '../../models/rest/dtos/auth/login-request.dto';
import { Observable, tap } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userManagementUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  login(loginRequestDto: LoginRequestDto): Observable<void> {
    const url = `${this.userManagementUrl}/login`;
    return this.http.post<void>(url, loginRequestDto, { withCredentials: true });
  }

  logout(): Observable<void> {
    const url = `${this.userManagementUrl}/logout`;
    return this.http.post<void>(url, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.sessionService.logout();
      })
    );
  }
}
