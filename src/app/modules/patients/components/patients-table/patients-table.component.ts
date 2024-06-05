import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Patient {
  nombre: string;
  edad: number;
  genero: string;
  gradoEscolar: string;
  resultados: string;
}

@Component({
  selector: 'app-patients-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patients-table.component.html',
  styleUrl: './patients-table.component.scss',
})
export class PatientsTableComponent {
  patients: Patient[] = [
    {
      nombre: 'Juan Pérez',
      edad: 8,
      genero: 'Masculino',
      gradoEscolar: '3ro Básica',
      resultados: 'Aprobado',
    },
    {
      nombre: 'Ana García',
      edad: 7,
      genero: 'Femenino',
      gradoEscolar: '2do Básica',
      resultados: 'Aprobado',
    },
    {
      nombre: 'Luis López',
      edad: 6,
      genero: 'Masculino',
      gradoEscolar: '1ro Básica',
      resultados: 'Pendiente',
    },
    // Añade más registros aquí
  ];

  filteredPatients: Patient[] = [];

  ngOnInit(): void {
    this.filteredPatients = this.patients;
  }

  filterTable(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPatients = this.patients.filter((patient) =>
      patient.nombre.toLowerCase().includes(filterValue),
    );
  }
}
