import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-link-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link-modal.component.html',
  styleUrl: './link-modal.component.scss'
})
export class LinkModalComponent implements OnChanges {
  @Input() link: string = '';
  @Output() close = new EventEmitter<void>();
  isLinkCopied: boolean = false;

  constructor(private element: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['link'] && this.link) {
      this.isLinkCopied = false;
      this.link = changes['link'].currentValue;
    }
  }
  
  closeContainer() {
    this.close.emit();
  }

  copyLink() {
    const linkElement = this.element.nativeElement.querySelector('#linkModal');
    if (linkElement) {
      if (this.link.length > 0) {
        navigator.clipboard.writeText(this.link).then(() => {
          this.isLinkCopied = true;
        }).catch(err => {
          //TODO: Improve message error
          alert('Error al copiar enlace');
        });
      }
    }
  }
  
}
