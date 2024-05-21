import { Component } from '@angular/core';
import { AsideComponent } from '../../components/aside/aside.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [AsideComponent, FooterComponent, HeaderComponent, RouterOutlet],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent {
  
}
