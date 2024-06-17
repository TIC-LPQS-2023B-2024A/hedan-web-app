import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserManagementService } from '../../../../core/services/user-management/user-management.service';
import { UpdatePsychologistDto } from '../../../../core/models/rest/dtos/psychologist/update-psychologist.dto';
import { UpdatePsychologistFormComponent } from '../../components/psychologist_update_form/psychologist-update-form.component';

@Component({
  selector: 'app-update-psychologist-page',
  standalone: true,
  imports: [RouterOutlet, UpdatePsychologistFormComponent, CommonModule],
  templateUrl: './update-psychologist-page.component.html',
  styleUrl: './update-psychologist-page.component.scss',
})
export class UpdatePsychologistPageComponent {
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

    try {
        this.userManagementService.updatePsychologist(updatePsychologistDto, this.psychologistCedula).subscribe({
          next: () => {
            this.isModalVisible = true;
            this.onCloseContainer();

          },
          error: (error) => {
            console.error('Error al actualizar el usuario', error);
          }
      });

    } catch (error) {
      console.error(error);
    }
  }

  // Navidates to list of psychologists
  onCloseContainer() {
    this.router.navigate(['/administracion/lista-psicologos']);

  }
}
