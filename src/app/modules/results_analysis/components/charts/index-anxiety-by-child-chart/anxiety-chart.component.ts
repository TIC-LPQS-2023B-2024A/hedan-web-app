import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NgxChartsModule,
  LegendPosition,
  colorSets,
} from '@swimlane/ngx-charts';
import { Subscription, combineLatest } from 'rxjs';
import { TestsReportDto } from '../../../../../core/models/rest/dtos/response/get-test-report.dto';
import { TestReportDataService } from '../../../../../core/services/results_analisis/test-report.service';
import { AnxietyScoreService } from '../../../../../core/services/results_analisis/t-score.service';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ColorSchemeService } from '../../../../../core/services/results_analisis/color-schema.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'anxiety-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './anxiety-chart.component.html',
  styleUrls: ['./anxiety-chart.component.scss'],
  animations: [],
})
export class AnxietyChartComponent implements OnInit, OnDestroy {
  [x: string]: any;
  private subscriptions: Subscription = new Subscription();
  filteredData: TestsReportDto[] = [];
  nonFilteredData: TestsReportDto[] = [];

  view: [number, number] = [1000, 450];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  yScaleMin: number = 25;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'índices de ansiedad';
  yAxisLabel: string = 'Puntuación T';
  timeline: boolean = true;
  legendTitle: string = 'ID Paciente';
  legendPosition: LegendPosition = LegendPosition.Right;
  colorScheme = colorSets.find((x) => x.name === 'vivid')!;
  referenceLines: { name: string; value: number }[] = [
    { name: '', value: 40 },
    { name: '', value: 50 },
    { name: '', value: 60 },
  ];
  yAxisTicks: number[] = [26, 28, 30, 32, 34, 36, 38, 40, 42, 44,
    46, 48, 50, 52, 54, 56, 58, 60, 62, 64,
    66, 68, 70, 72, 74, 76, 78, 80, 82, 84,
    86];


  dataIndexResult: any[] = []; // Aquí se almacenarán los datos para la gráfica

  constructor(
    private dataService: TestReportDataService,
    private tScoreService: AnxietyScoreService,
    private colorSchemeService: ColorSchemeService,
    private router: Router,
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getTScoreMain(indexAnxiety: number, score: number) {
    return this.tScoreService.getTScore(indexAnxiety, score);
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.dataService.testData$.subscribe((data: TestsReportDto[]) => {
        this.nonFilteredData = data;
        this.filteredData = data;
        this.updateChart();
      }),
    );

    this.subscriptions.add(
      combineLatest([this.dataService.filterChildID$]).subscribe(
        ([childID]) => {
          if (childID !== -1) {
            this.filteredData = this.applyFilters(childID);
            this.updateChart();
          } else {
            this.filteredData = this.nonFilteredData;
            this.updateChart();
          }
        },
      ),
    );

    this.subscriptions.add(
      combineLatest([this.colorSchemeService.colorScheme$]).subscribe(
        ([color]) => {
          this.colorScheme = colorSets.find((x) => x.name === color)!;
        },
      ),
    );
  }

  applyFilters(childID: number): TestsReportDto[] {
    return this.nonFilteredData.filter((data) => {
      const matchesGrade = childID === 0 || data.child_id === childID;
      return matchesGrade;
    });
  }

  updateChart(): void {
    this.dataIndexResult = this.filteredData.map((item) => ({
      name: item.child_id,
      series: [
        {
          value: this.getTScoreMain(
            1,
            parseInt(
              this.getPropertySafely(item.test_results, 'defensiveness_index'),
            ),
          ),
          name: 'Defensividad',
        },

        {
          value: this.getTScoreMain(
            5,
            parseInt(
              this.getPropertySafely(item.test_results, 'total_anxiety_index'),
            ),
          ),
          name: 'Total',
        },
        {
          value: this.getTScoreMain(
            2,
            parseInt(
              this.getPropertySafely(
                item.test_results,
                'physiological_anxiety_index',
              ),
            ),
          ),
          name: 'Fisiológica',
        },

        {
          value: this.getTScoreMain(
            3,
            parseInt(this.getPropertySafely(item.test_results, 'worry_index')),
          ),
          name: 'Inquietud',
        },

        {
          value: this.getTScoreMain(
            4,
            parseInt(
              this.getPropertySafely(item.test_results, 'social_anxiety_index'),
            ),
          ),
          name: 'Social',
        },
      ],
    }));
  }

  getPropertySafely(obj: any, propertyName: string): any {
    return obj && typeof obj === 'object' && propertyName in obj
      ? obj[propertyName]
      : null;
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    const testId = data.hasOwnProperty('value') ? data.value : data;
    this.router.navigate(['/cuestionario/resultado'], { queryParams: { testId: testId } });
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
