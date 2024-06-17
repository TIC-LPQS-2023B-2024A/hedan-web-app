import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [CommonModule],
  template: ``,
})
export class LogoutPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.authService
      .logout()
      .pipe(finalize(() => this.router.navigate(['/login'])))
      .subscribe();
  }
}
