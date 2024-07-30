import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserManagementService } from '../../../../core/services/user-management/user-management.service';
import { UpdatePsychologistDto } from '../../../../core/models/rest/dtos/psychologist/update-psychologist.dto';
import { UpdatePsychologistFormComponent } from '../../components/psychologist_update_form/psychologist-update-form.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-update-psychologist-page',
  standalone: true,
  imports: [RouterOutlet, UpdatePsychologistFormComponent, CommonModule, AlertComponent],
  templateUrl: './update-psychologist-page.component.html',
  styleUrl: './update-psychologist-page.component.scss',
})
export class UpdatePsychologistPageComponent {
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'danger';

  psychologistCedula: string = '';
  isModalVisible = false;

  constructor(
    private userManagementService  : UserManagementService,
    private router: Router  // Importa el servicio Router
  ) {
  }

  onCedulaValue(cedula: string) {
    this.psychologistCedula = cedula;
  }

  // Update Psychologist data using service
  onFormSubmitted(updatePsychologistDto: UpdatePsychologistDto) {

    this.alertMessage = null;
    this.alertType = 'danger';


        this.userManagementService.updatePsychologist(updatePsychologistDto, this.psychologistCedula).subscribe({
          next: async() => {
            this.showAlert('¡Actualización exitosa!', 'success');
            await wait(3000);
            this.isModalVisible = true;
            this.onCloseContainer();

          },
          error: (error) => {
            this.showAlert('Existió un problema, intente nuevamente', 'danger');
            console.error('Error al actualizar el usuario', error);
          }
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
