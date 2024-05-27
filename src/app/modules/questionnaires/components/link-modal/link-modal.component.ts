import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-link-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link-modal.component.html',
  styleUrl: './link-modal.component.scss'
})
export class LinkModalComponent {
  @Output() close = new EventEmitter<void>();
  isLinkCopied: boolean = false;

  constructor(private element: ElementRef) {}
  
  closeContainer() {
    this.close.emit();
  }

  copyLink() {
    const linkElement = this.element.nativeElement.querySelector('.link-container a');
    if (linkElement) {
      const linkText = linkElement.getAttribute('href');
      if (linkText) {
        navigator.clipboard.writeText(linkText).then(() => {
          this.isLinkCopied = true;
          console.log(this.isLinkCopied);
        }).catch(err => {
          console.error('Error al copiar el enlace: ', err);
        });
      }
    }
  }
  
}
