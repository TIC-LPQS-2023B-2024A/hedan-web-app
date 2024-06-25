import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../core/services/auth/session.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  protected userName: string = '';

  constructor(private sessionService: SessionService, private router: Router) {
  }

  ngOnInit() {
    this.userName = this.sessionService.userData!.name;
  }

  logout(): void {
    this.router.navigateByUrl('/logout');
  }
}
