import { Component, Input } from '@angular/core';
import { PatientInfoDto } from '../../../../core/models/dtos/questionnaires/patient-info-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.scss'
})
export class PatientInfoComponent {
  @Input()
  patientData!: PatientInfoDto; 

  scholarGradeMap: { [key: number]: string } = {
    1: '1ro Básica',
    2: '2do Básica',
    3: '3ro Básica',
    4: '4to Básica'
  };

  getGender(sex: string): string {
    return sex === "m" ? 'Masculino' : 'Femenino';
  }

  getScholarGrade(scholarGrade: number): string {
    return this.scholarGradeMap[scholarGrade];
  }

  formatDateTime(dateTimeString: string | null): string {
    if (!dateTimeString) {
      return ''; 
    }
    
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.toLocaleString('es-ES', { month: 'long' }); 
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0'); 
  
    return `${day} ${month} ${year} - ${hours}:${minutes}`; 
  }

}
