import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { TestReportDataService } from '../../../../../core/services/results_analisis/test-report.service';
import { NgxChartsModule, colorSets } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { TestsReportDto } from '../../../../../core/models/rest/dtos/response/get-test-report.dto';
import { ColorSchemeService } from '../../../../../core/services/results_analisis/color-schema.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'incorrect-questionnaires',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './number-incorrect-questionnaires.component.html',
  styleUrls: ['./number-incorrect-questionnaires.component.scss'],
})
export class IncorrectQuestionnairesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  filteredData: TestsReportDto[] = [];
  nonFilteredData: TestsReportDto[] = [];
  totalChildData: any[] = [];
  incorrectQuestionnaires: TestsReportDto[] = []; // Array para almacenar los cuestionarios incorrectos


  view: [number, number] = [250, 120];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendTitle: string = '';
  legendPosition: LegendPosition = LegendPosition.Below;
  colorScheme = colorSets.find((x) => x.name === 'vivid')!;
  cardColor: string = '#472837';
  textColor: string = '#333752';
  single: any[] = [];
  value: number = 0;
  previousValue: number = 0;
  units: string = 'Posibles cuestionarios incorrectos';
  min: number = 0;
  max: number = 0;

  constructor(
    private dataService: TestReportDataService,
    private colorSchemeService: ColorSchemeService,
    private router: Router // Inject Router

  ) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.dataService.testData$.subscribe({
        next: (data: TestsReportDto[]) => {
          this.nonFilteredData = data;
          this.filteredData = data;
          this.max = this.nonFilteredData.length;
          this.previousValue = this.nonFilteredData.length;
          this.updateChart();
        },
      }),
    );

    this.subscriptions.add(
      combineLatest([
        this.dataService.filterSchoolarGrade$,
        this.dataService.filter$,
        this.dataService.filterSex$,
        this.colorSchemeService.colorScheme$,
      ]).subscribe(([schoolarGrade, age, sex, color]) => {
        this.filteredData = this.applyFilters(schoolarGrade, age, sex);
        this.colorScheme = colorSets.find((x) => x.name === color)!;
        this.updateChart();
      }),
    );
  }

  applyFilters(
    schoolarGrade: number,
    age: number,
    sex: string,
  ): TestsReportDto[] {
    return this.nonFilteredData.filter((data) => {
      const matchesGrade =
        schoolarGrade === 0 || data.scholar_grade === schoolarGrade; //schoolar grade filter
      const matchesAge = age === 0 || data.child_age === age; //age filter
      const matchesSex = sex === '' || data.child_sex === sex; //sex filter
      return matchesGrade && matchesAge && matchesSex;
    });
  }

  updateChart() {
    this.incorrectQuestionnaires = this.filteredData.filter(
      (data) => data.test_results.inconsistent_answers_index >= 6,
    );
    this.value = this.incorrectQuestionnaires.length;
    // Establecer el valor previo como la longitud de los datos filtrados (total de cuestionarios)
  }

  getSex(sex: string): string {
    switch (sex) {
      case 'm':
        return 'Masculino';
      case 'f':
        return 'Femenino';
      default:
        return `Sex ${sex}`;
    }
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  navigateToResult(childId: number): void {
    this.router.navigate(['/cuestionario/resultado'], { queryParams: { testId: childId } });
  }
}
