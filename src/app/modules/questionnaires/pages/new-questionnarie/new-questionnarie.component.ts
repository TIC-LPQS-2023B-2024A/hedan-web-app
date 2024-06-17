import { Component, OnInit } from '@angular/core';
import { QuestionnarieFormComponent } from '../../components/questionnarie-form/questionnarie-form.component';
import { Router, RouterOutlet } from '@angular/router';
import { LinkModalComponent } from '../../components/link-modal/link-modal.component';
import { CommonModule } from '@angular/common';
import { QuestionnairesService } from '../../../../core/services/questionnaires/questionnaires.service';
import { Observable, switchMap } from 'rxjs';
import { CreatePatientDto } from '../../../../core/models/dtos/patients/CreatePatientDto';
import { PatientsService } from '../../../../core/services/patients/patients.service';
import { SessionService } from '../../../../core/services/auth/session.service';

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
export class NewQuestionnarieComponent implements OnInit {
  isModalVisible = false;
  link = '';
  private _psychologistCedula = '';

  constructor(
    private questionnariesService: QuestionnairesService,
    private patientsService: PatientsService,
    private sessionService: SessionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._psychologistCedula = this.sessionService.userData?.cedula ?? '';
  }

  onFormSubmitted(patient: CreatePatientDto) {
    // Add child
    this.patientsService
      .addChild(this._psychologistCedula, patient)
      .pipe(
        switchMap((childId) => {
          return this.getLink(childId);
        }),
      )
      .subscribe({
        next: (invitationLink) => {
          this.isModalVisible = true;
          this.link = invitationLink;
        },
      });
  }

  getLink(childId: number): Observable<string> {
    return this.questionnariesService.getInvitationLink(
      childId,
      this._psychologistCedula,
    );
  }

  onCloseContainer() {
    this.isModalVisible = false;
  }
}
