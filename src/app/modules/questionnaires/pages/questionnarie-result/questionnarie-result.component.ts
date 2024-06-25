import { Component, OnInit } from '@angular/core';
import { PatientInfoComponent } from '../../components/patient-info/patient-info.component';
import { ResultComponent } from '../../components/result/result.component';
import { QuestionComponent } from '../../components/question/question.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InconsistentResponsesComponent } from '../../components/inconsistent-responses/inconsistent-responses.component';
import { ActivatedRoute } from '@angular/router';
import {
  AnswersSet,
  TestResult,
  TestResults,
} from '../../../../core/models/dtos/questionnaires/test-result-dto';
import { QuestionnairesService } from '../../../../core/services/questionnaires/questionnaires.service';
import { PatientInfoDto } from '../../../../core/models/dtos/questionnaires/patient-info-dto';
import { SessionService } from '../../../../core/services/auth/session.service';
import {
  InconsistentResponsesDTO,
  Pairs,
} from '../../../../core/models/dtos/questionnaires/inconsistent-responses-dto';

@Component({
  selector: 'app-questionnarie-result',
  standalone: true,
  imports: [
    PatientInfoComponent,
    ResultComponent,
    QuestionComponent,
    CommonModule,
    InconsistentResponsesComponent,
  ],
  templateUrl: './questionnarie-result.component.html',
  styleUrl: './questionnarie-result.component.scss',
})
export class QuestionnarieResultComponent implements OnInit {
  patientId: number = 0;
  questions: any[] = [];
  filteredQuestions: any[] = [];
  private _psychologistCedula = '';
  testResult: TestResult | undefined;
  patientInfo!: PatientInfoDto;
  answers: AnswersSet[] = [];
  anxietyIndex: TestResults | undefined;
  inconsistentQuestions: InconsistentResponsesDTO = {
    pairs: [],
    inconsistency_index: 0,
  };

  constructor(
    private http: HttpClient,
    private questionnairesService: QuestionnairesService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Get questions set
    this.http.get('assets/questions.json').subscribe((data: any) => {
      this.questions = data;
      this.filteredQuestions = this.questions; // Initially show all questions

      // Get psychologist cedula
      this._psychologistCedula = this.sessionService.userData?.cedula ?? '';
    });

    // Get test id and result
    this.route.queryParamMap.subscribe((params) => {
      const testIdStr = params.get('testId');
      if (testIdStr) {
        const testId = Number(testIdStr);
        this.questionnairesService
          .getTestResult(testId, this._psychologistCedula)
          .subscribe((data) => {
            this.testResult = data;

            // Get patient info
            this.patientInfo = {
              name: this.testResult.child_name,
              age: this.testResult.child_age,
              sex: this.testResult.child_sex,
              test_reason: this.testResult.test_reason,
              scholar_grade: this.testResult.scholar_grade,
              test_date: this.testResult.date_time_of_answer,
              test_sender: this.testResult.test_sender,
            };

            // Set answers set
            this.answers = this.testResult.answers_set;

            // Set anxiety index
            if (this.testResult.test_results) {
              this.anxietyIndex = this.testResult.test_results;
            }

            // Set inconsistent questions
            this.getInconsistencies();
            console.log(this.answers[0].value);
            console.log( this.answers[48].value );
            console.log( this.answers[49].value );
          });
      } else {
        alert('No se encontró el test');
      }
    });
  }



  onAnxietyIndexChange(event: Event): void {
    const selectedIndex = (event.target as HTMLSelectElement).value;
    if (selectedIndex === 'ALL') {
      this.filteredQuestions = this.questions;
    } else {
      this.filteredQuestions = this.questions.filter(
        question => question.AnxietyIndex === selectedIndex
      );
    }
  }

  getAnswer(index: number): boolean | undefined {
    return this.answers[index]?.value;
  }

  getInconsistencies() {
    // Set pairs
    this.inconsistentQuestions.pairs.push(this.formpairs(1, 7));
    this.inconsistentQuestions.pairs.push(this.formpairs(2, 34));
    this.inconsistentQuestions.pairs.push(this.formpairs(3, 9));
    this.inconsistentQuestions.pairs.push(this.formpairs(5, 48));
    this.inconsistentQuestions.pairs.push(this.formpairs(6, 38));
    this.inconsistentQuestions.pairs.push(this.formpairs(18, 32));
    this.inconsistentQuestions.pairs.push(this.formpairs(22, 36));
    this.inconsistentQuestions.pairs.push(this.formpairs(23, 28));
    this.inconsistentQuestions.pairs.push(this.formpairsEquals(37, 47));
    // Set inconsistency index
    this.inconsistentQuestions.inconsistency_index =
      this.anxietyIndex?.inconsistent_answers_index ?? 0;

  }

  formpairs(id_1: number, id_2: number): Pairs {
    return {
      id_1: id_1,
      answer_1: this.answers[id_1]?.value,
      id_2: id_2,
      answer_2: this.answers[id_2]?.value,
      add_score: this.answers[id_1]?.value !== this.answers[id_2]?.value,
    };
  }

  formpairsEquals(id_1: number, id_2: number): Pairs {
    return {
      id_1: id_1,
      answer_1: this.answers[id_1]?.value ? true : false,
      id_2: id_2,
      answer_2: this.answers[id_2]?.value,
      add_score: this.answers[id_1]?.value === this.answers[id_2]?.value,
    };
  }

}
