import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAsideComponent } from './shared/layouts/header-aside/header-aside.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderAsideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hedan-web-app';
}
