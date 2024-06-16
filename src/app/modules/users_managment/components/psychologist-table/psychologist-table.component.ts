import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementService } from '../../../../core/services/user-management/user-management.service';
import { GetPsychologistDto } from '../../../../core/models/rest/dtos/psychologist/get-psychologist.dto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-psychologist-table',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './psychologist-table.component.html',
  styleUrls: ['./psychologist-table.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})

export class PsychologistsTableComponent implements OnInit {
  psychologists: GetPsychologistDto[] = [];
  filteredPsychologists: GetPsychologistDto[] = [];

  constructor(
    private userManagementService: UserManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPsychologists();
  }
  //Load Psychologists data from DB using service
  loadPsychologists(): void {
    this.userManagementService.getPsychologists().subscribe({
      next: (data: GetPsychologistDto[]) => {
        this.psychologists = data;
        this.filteredPsychologists = data;
      },
      error: (error) => {
        console.error('Error al obtener la lista de psicólogos', error);
      }
    });
  }

  //Filter Psychologists by name
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value.toLowerCase();
    this.filteredPsychologists = this.psychologists.filter(psychologist =>
      psychologist.name.toLowerCase().includes(searchValue)
    );
  }

  editPsychologist(cedula: string): void {
    this.router.navigate(['/administracion/actualizar-psicologo', cedula]);
  }

}
