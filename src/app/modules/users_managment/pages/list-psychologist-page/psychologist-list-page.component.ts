import { Component } from '@angular/core';
import { PsychologistsTableComponent } from '../../components/psychologist-table/psychologist-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [PsychologistsTableComponent],
  templateUrl: './psychologist-list-page.component.html',
  styleUrl: './psychologist-list-page.component.scss'
})
export class PsychologistListComponent {
  constructor(private router: Router) {}

  // Navigate to Add Psychologist Page
  navigateToAddPsychologist(): void {
    this.router.navigate(['/administracion/nuevo-psicologo']);
  }
}
