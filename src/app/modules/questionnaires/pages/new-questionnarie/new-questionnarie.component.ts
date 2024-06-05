import { Component } from '@angular/core';
import { QuestionnarieFormComponent } from '../../components/questionnarie-form/questionnarie-form.component';
import { RouterOutlet } from '@angular/router';
import { LinkModalComponent } from '../../components/link-modal/link-modal.component';
import { CommonModule } from '@angular/common';
import { QuestionnairesService } from '../../../../core/services/questionnaires/questionnaires.service';
import { Observable } from 'rxjs';
import { CreatePatientDto } from '../../../../core/models/dtos/patients/CreatePatientDto';
import { PatientsService } from '../../../../core/services/patients/patients.service';
import { InvitationLink } from '../../../../core/models/dtos/questionnaires/invitation-link';

@Component({
  selector: 'app-new-questionnarie',
  standalone: true,
  imports: [
    RouterOutlet,
    QuestionnarieFormComponent,
    LinkModalComponent,
    CommonModule,
  ],
  templateUrl: './new-questionnarie.component.html',
  styleUrl: './new-questionnarie.component.scss',
})
export class NewQuestionnarieComponent {
  isModalVisible = false;
  link = '';

  constructor(
    private questionnariesService: QuestionnairesService,
    private patientsService: PatientsService,
  ) {}

  onFormSubmitted(patient: CreatePatientDto) {
    // Add child
    this.patientsService.addChild('1717171717', patient).subscribe({
      next: (childId) => {
        // Get link
        this.getLink(childId);
      },
    });

  }

  getLink(childId: number) {
    this.questionnariesService
      .getInvitationLink(childId, '1717171717')
      .subscribe((invitationLink: string) => {
        this.isModalVisible = true;
        this.link = invitationLink;
      });
  }

  onCloseContainer() {
    this.isModalVisible = false;
  }
}
