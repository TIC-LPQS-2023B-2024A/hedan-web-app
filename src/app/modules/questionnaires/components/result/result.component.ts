import { Component, Input } from '@angular/core';
import { TestResults } from '../../../../core/models/dtos/questionnaires/test-result-dto';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  @Input() results: TestResults | undefined;
}
