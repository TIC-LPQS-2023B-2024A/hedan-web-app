import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Psychologist {
  number: number;
  cedula: string;
  nombre: string;
  genero: string;
  correo: string;
}

@Component({
  selector: 'app-psychologist-table',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './psychologist-table.component.html',
  styleUrls: ['./psychologist-table.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class PsychologistsTableComponent implements OnInit {
  psychologists: Psychologist[] = [
    { number: 1, cedula: '12345678', nombre: 'Ana Gómez', genero: 'Femenino', correo: 'ana.gomez@example.com' },
    { number: 2, cedula: '87654321', nombre: 'Carlos Martínez', genero: 'Masculino', correo: 'carlos.martinez@example.com' },
    { number: 3, cedula: '11223344', nombre: 'Luisa Fernández', genero: 'Femenino', correo: 'luisa.fernandez@example.com' },
    { number: 4, cedula: '44332211', nombre: 'Jorge Ramírez', genero: 'Masculino', correo: 'jorge.ramirez@example.com' },
    { number: 5, cedula: '55667788', nombre: 'Elena Rodríguez', genero: 'Femenino', correo: 'elena.rodriguez@example.com' },
    { number: 6, cedula: '88776655', nombre: 'Mario Sánchez', genero: 'Masculino', correo: 'mario.sanchez@example.com' }
  ];

  filteredPsychologists: Psychologist[] = [];

  constructor() {}

  ngOnInit(): void {
    this.filteredPsychologists = this.psychologists;
  }

  onSearchChange(searchValue: string): void {
    this.filteredPsychologists = this.psychologists.filter(psychologist =>
      psychologist.nombre.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
