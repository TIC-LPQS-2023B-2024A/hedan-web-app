import { Component, Input, OnInit } from '@angular/core';
import { TestResults } from '../../../../../core/models/dtos/questionnaires/test-result-dto';
import { AnxietyScoreService } from '../../../../../core/services/results_analisis/t-score.service';
import {  NgClass } from '@angular/common';

@Component({
  selector: 'app-t-index-result',
  standalone: true,
  templateUrl: './t-index-result.component.html',
  styleUrls: ['./t-index-result.component.scss'],
  imports: [NgClass],
})
export class TIndexResultComponent implements OnInit {
  tDefScore: number = 0;
  tFisScore: number = 0;
  tInqScore: number = 0;
  tSocScore: number = 0;
  tTotScore: number = 0;
  testResults?: TestResults;

  @Input() set results(value: TestResults | undefined) {
    if (value) {
      this.testResults = value;
      this.tDefScore =
        this.tIndexService.getTScore(1, value.defensiveness_index) ?? 0;
      this.tFisScore =
        this.tIndexService.getTScore(
          2,
          value.physiological_anxiety_index,
        ) ?? 0;
      this.tInqScore =
        this.tIndexService.getTScore(3, value.worry_index) ?? 0;
      this.tSocScore =
        this.tIndexService.getTScore(4, value.social_anxiety_index) ?? 0;
      this.tTotScore =
        this.tIndexService.getTScore(5, value.total_anxiety_index) ?? 0;
    }
  }

  constructor(private tIndexService: AnxietyScoreService) {}

  ngOnInit(): void {

  }	
}
