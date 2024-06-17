import { Component } from '@angular/core';
import { PatientInfoComponent } from '../../components/patient-info/patient-info.component';
import { ResultComponent } from '../../components/result/result.component';

@Component({
  selector: 'app-questionnarie-result',
  standalone: true,
  imports: [PatientInfoComponent, ResultComponent],
  templateUrl: './questionnarie-result.component.html',
  styleUrl: './questionnarie-result.component.scss'
})
export class QuestionnarieResultComponent {

}
