import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 768;
  }
}
