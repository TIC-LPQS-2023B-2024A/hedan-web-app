import { Component } from '@angular/core';
import { PsychologistFormComponent } from '../../components/psychologist_add_form/psychologist-form.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreatePsychologistDto } from '../../../../core/models/rest/dtos/psychologist/create-psychologist.dto';
import { UserManagementService } from '../../../../core/services/user-management/user-management.service';

@Component({
  selector: 'app-new-questionnarie',
  standalone: true,
  imports: [RouterOutlet,PsychologistFormComponent, CommonModule],
  templateUrl: './new-psychologist-page.component.html',
  styleUrl: './new-psychologist-page.component.scss',
})
export class NewPsychologistComponent {

  constructor(
    private userManagementService  : UserManagementService,
    private router: Router  // Importa el servicio Router

  ) {
  }

  isModalVisible = false;

  // Create Psychologist data using service
  onFormSubmitted(createPsychologistDto: CreatePsychologistDto) {
    try {
      this.userManagementService.addPsychologist(createPsychologistDto).subscribe({
        next: () => {
          this.isModalVisible = true;
          this.onCloseContainer();
        }
      })

    } catch (error) {
      console.error(error);
    }


  }

  // Navidates to list of psychologists
  onCloseContainer() {
    this.router.navigate(['/administracion/lista-psicologos']);

  }

}
