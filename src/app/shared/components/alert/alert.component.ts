import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() message: string | null = null;
  @Input() type: 'success' | 'danger' = 'danger';
  show = false;
  timeoutId: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && this.message) {
      this.showAlert();
    }
  }

  closeAlert(): void {
    this.show = false;
    this.message = null;
    clearTimeout(this.timeoutId); 
  }

  showAlert(): void {
    this.show = true;
      clearTimeout(this.timeoutId); 
      this.timeoutId = setTimeout(() => {
        this.show = false;
      }, 3000);
  }
}
