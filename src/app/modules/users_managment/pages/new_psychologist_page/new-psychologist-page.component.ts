import { Component } from '@angular/core';
import { PsychologistFormComponent } from '../../components/psychologist_add_form/psychologist-form.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreatePsychologistDto } from '../../../../core/models/rest/dtos/psychologist/create-psychologist.dto';
import { UserManagementService } from '../../../../core/services/user-management/user-management.service';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-new-questionnarie',
  standalone: true,
  imports: [
    RouterOutlet,
    PsychologistFormComponent,
    CommonModule,
    AlertComponent,
  ],
  templateUrl: './new-psychologist-page.component.html',
  styleUrl: './new-psychologist-page.component.scss',
})
export class NewPsychologistComponent {
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'danger';

  constructor(
    private userManagementService: UserManagementService,
    private router: Router, // Importa el servicio Router
  ) {}

  isModalVisible = false;

  // Create Psychologist data using service
  onFormSubmitted(createPsychologistDto: CreatePsychologistDto) {
    this.alertMessage = null;
    this.alertType = 'danger';

    this.userManagementService
      .addPsychologist(createPsychologistDto)
      .subscribe({
        next: async () => {
          this.showAlert('¡Registro exitoso!', 'success');
          await wait(3000);
          this.isModalVisible = true;
          this.onCloseContainer();
        },
        error: (error) => {
          this.showAlert('Existió un problema, intente nuevamente', 'danger');
        },
      });
  }

  // Navidates to list of psychologists
  onCloseContainer() {
    this.router.navigate(['/administracion/lista-psicologos']);
  }

  showAlert(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertType = type;
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
