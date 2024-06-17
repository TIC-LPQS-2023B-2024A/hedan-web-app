import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SessionService } from '../../../core/services/auth/session.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  protected userRole: string = '';

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
    this.userRole = this.sessionService.userData!.role;
  }
}
