import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionnarieFormComponent } from '../../components/questionnarie-form/questionnarie-form.component';
import {  RouterOutlet } from '@angular/router';
import { LinkModalComponent } from '../../components/link-modal/link-modal.component';
import { CommonModule } from '@angular/common';
import { QuestionnairesService } from '../../../../core/services/questionnaires/questionnaires.service';
import { Observable, switchMap } from 'rxjs';
import { CreatePatientDto } from '../../../../core/models/dtos/patients/CreatePatientDto';
import { PatientsService } from '../../../../core/services/patients/patients.service';
import { SessionService } from '../../../../core/services/auth/session.service';
import { AlertComponent } from "../../../../shared/components/alert/alert.component";

@Component({
    selector: 'app-new-questionnarie',
    standalone: true,
    templateUrl: './new-questionnarie.component.html',
    styleUrl: './new-questionnarie.component.scss',
    imports: [
        RouterOutlet,
        QuestionnarieFormComponent,
        LinkModalComponent,
        CommonModule,
        AlertComponent
    ]
})
export class NewQuestionnarieComponent implements OnInit {
  isModalVisible = false;
  link = '';
  private _psychologistCedula = '';
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'danger';
  @ViewChild('alert') alert!: AlertComponent;


  constructor(
    private questionnariesService: QuestionnairesService,
    private patientsService: PatientsService,
    private sessionService: SessionService,
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
          this.alertMessage = 'Test CMASR-2 creado con éxito';
          this.alertType = 'success';
          this.alert.showAlert();
          // Get invitation link
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
