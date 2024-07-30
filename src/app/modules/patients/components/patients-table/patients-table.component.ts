import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../core/services/auth/session.service';
import { RouterLink } from '@angular/router';
import { TestSessionDto } from '../../../../core/models/dtos/questionnaires/test-session-dto';
import { QuestionnairesService } from '../../../../core/services/questionnaires/questionnaires.service';
import { environment } from '../../../../../environments/environment';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { Sex } from '../../../../core/models/enums/sex-enum';

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
  templateUrl: './patients-table.component.html',
  styleUrl: './patients-table.component.scss',
  imports: [CommonModule, RouterLink, AlertComponent],
})
export class PatientsTableComponent implements OnInit {
  patients: TestSessionDto[] = [];
  filteredPatients: TestSessionDto[] = [];
  private _psychologistCedula = '';
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'danger';
  @ViewChild('alert') alert!: AlertComponent;

  constructor(
    private sessionService: SessionService,
    private questionnariesService: QuestionnairesService,
  ) {}

  ngOnInit(): void {
    this._psychologistCedula = this.sessionService.userData?.cedula ?? '';
    this.getPatients();
  }

  scholarGradeMap: { [key: number]: string } = {
    1: '1ro Básica',
    2: '2do Básica',
    3: '3ro Básica',
    4: '4to Básica',
  };

  getPatients(): void {
    this.questionnariesService
      .getTestSessions(this._psychologistCedula)
      .subscribe({
        next: (data) => {
          this.patients = data;
          this.filteredPatients = this.patients;
        },
        error: (error) => {
          console.log('Error al obtener los resultados:', error);
        },
      });
  }

  filterTable(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPatients = this.patients.filter((patient) =>
      patient.child_name.toLowerCase().includes(filterValue),
    );
  }

  getGender(sex: string): string {
    return sex === Sex.Masculino ? 'Masculino' : 'Femenino';
  }

  getScholarGrade(scholarGrade: number): string {
    return this.scholarGradeMap[scholarGrade];
  }

  formatDateTime(dateTimeString: string | null): string {
    if (!dateTimeString) {
      return 'Sin respuesta';
    }

    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.toLocaleString('es-ES', { month: 'long' });
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year} - ${hours}:${minutes}`;
  }

  copyInvitationLink(testToken: string): void {
    const invitationLink = `${environment.gameUrl}/?token=${testToken}`;
    navigator.clipboard
      .writeText(invitationLink)
      .then(() => {
        this.alertMessage = 'Enlace copiado al portapapeles';
        this.alertType = 'success';
        this.alert.showAlert();
      })
      .catch((err) => {
        this.alertMessage = 'Error al copiar el enlace ' + err.message;
        this.alertType = 'danger';
        this.alert.showAlert();
      });
  }

  deleteTestSession(testId: number): void {
    if (!confirm('¿Seguro que quieres borrar este test?')) return;
    this.questionnariesService
      .deleteTestSession(testId, this._psychologistCedula)
      .subscribe({
        next: (success) => {
          if (success) {
            this.getPatients();
            this.alertMessage = 'Test borrado con éxito';
            this.alertType = 'success';
            this.alert.showAlert();
          } else {
            this.alertMessage = 'Error al borrar el test';
            this.alertType = 'danger';
            this.alert.showAlert();
          }
        },
        error: (error) => {
          this.alertMessage = 'Error al borrar el test: ' + error.message;
          this.alertType = 'danger';
          this.alert.showAlert();
        },
      });
  }
}
