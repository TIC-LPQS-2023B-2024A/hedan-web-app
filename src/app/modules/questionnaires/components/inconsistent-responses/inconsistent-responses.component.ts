import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InconsistentResponsesDTO } from '../../../../core/models/dtos/questionnaires/inconsistent-responses-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inconsistent-responses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inconsistent-responses.component.html',
  styleUrl: './inconsistent-responses.component.scss'
})
export class InconsistentResponsesComponent {

  @Input() inconsistentResponses!: InconsistentResponsesDTO;

  getAnswerText(answer: boolean): string {
    return answer ? 'Si' : 'No';
  }

}
