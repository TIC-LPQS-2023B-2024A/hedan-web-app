import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  LegendPosition,
  NgxChartsModule,
  colorSets,
} from '@swimlane/ngx-charts';
import { Subscription, combineLatest } from 'rxjs';
import { TestsReportDto } from '../../../../../core/models/rest/dtos/response/get-test-report.dto';
import { TestReportDataService } from '../../../../../core/services/results_analisis/test-report.service';
import { AnxietyScoreService } from '../../../../../core/services/results_analisis/t-score.service';
import { ColorSchemeService } from '../../../../../core/services/results_analisis/color-schema.service';

@Component({
  selector: 'median-index',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './median-index.component.html',
  styleUrls: ['./median-index.component.scss'],
})
export class MedianIndexComponent implements OnInit, OnDestroy {
  [x: string]: any;
  private subscriptions: Subscription = new Subscription();
  filteredData: TestsReportDto[] = [];
  nonFilteredData: TestsReportDto[] = [];

  view: [number, number] = [700, 250];
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
  legendTitle: string = 'Género';
  legendPosition: LegendPosition = LegendPosition.Right;
  colorScheme = colorSets.find((x) => x.name === 'vivid')!;
  referenceLines: { name: string; value: number }[] = [
    //{ name: '', value: 40 },
    //{ name: '', value: 50 },
    //{ name: '', value: 60 },
    { name: '(39 y menor) Menos problemático que la mayoría de estudiantes', value: 25 },
    { name: '(40-60) No más problemático que para la mayoría de estudiantes', value: 40 },
    { name: '(61-70) Moderadamente problemático', value: 61 },
    { name: '(71 y mayor) Extremadamente problemático', value: 71 },
  ];

  dataMedianIndex: any[] = []; // Aquí se almacenarán los datos para la gráfica

  constructor(
    private dataService: TestReportDataService,
    private tScoreService: AnxietyScoreService,
    private colorSchemeService: ColorSchemeService,
  ) {}

  getTScoreMain(indexAnxiety: number, score: number) {
    return this.tScoreService.getTScore(indexAnxiety, score);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
        schoolarGrade === 0 || data.scholar_grade === schoolarGrade;
      const matchesAge = age === 0 || data.child_age === age;
      const matchesSex = sex === '' || data.child_sex === sex;
      return matchesGrade && matchesAge && matchesSex;
    });
  }

  updateChart(): void {
    const medianData = this.calculateMedianBySex(this.filteredData);
    this.dataMedianIndex = medianData;
  }

  calculateMedianBySex(data: TestsReportDto[]): any[] {
    const sexes = Array.from(new Set(data.map((item) => item.child_sex))); // Obtener los sexos únicos

    // Objeto para almacenar los resultados por sexo e índice
    const resultBySexAndIndex: {
      [sex: string]: { name: string; value: number }[];
    } = {};

    // Iterar sobre los datos para agrupar por sexo e índice y calcular las medianas
    sexes.forEach((sex) => {
      resultBySexAndIndex[sex] = [];

      // Iterar sobre cada índice que deseas calcular (ej. social_anxiety_index, physiological_anxiety_index, etc.)
      const indicesSearch = [
        'defensiveness_index',
        'total_anxiety_index',
        'physiological_anxiety_index',
        'worry_index',
        'social_anxiety_index',
      ];

      indicesSearch.forEach((index) => {
        const values = data
          .filter((item) => item.child_sex === sex)
          .map((item) => this.getPropertySafely(item.test_results, index))
          .filter((value) => typeof value === 'number')
          .sort((a, b) => (a as number) - (b as number));

        //Obtener los valores T acorde a los indices
        const tValues = values.map((value) =>
          this.getTScoreMain(this.getAnxietyIndex(index), value as number),
        );

        const median = this.calculateMedian(
          tValues.filter((tValue) => tValue !== null) as number[],
        );

        resultBySexAndIndex[sex].push({
          name: this.getIndexName(index),
          value: median,
        });
      });
    });
    const resultArray = sexes.map((sex) => ({
      name: sex === 'm' ? 'Niños' : 'Niñas', // Convertir a un nombre legible
      series: resultBySexAndIndex[sex],
    }));

    return resultArray;
  }

  getAnxietyIndex(indexName: string): number {
    const indexMap: { [key: string]: number } = {
      defensiveness_index: 1,
      physiological_anxiety_index: 2,
      worry_index: 3,
      social_anxiety_index: 4,
      total_anxiety_index: 5,
    };
    return indexMap[indexName] || 0;
  }

  getIndexName(index: string): string {
    switch (index) {
      case 'social_anxiety_index':
        return 'Social';
      case 'physiological_anxiety_index':
        return 'Fisiológico';
      case 'defensiveness_index':
        return 'Defensividad';
      case 'worry_index':
        return 'Inquietud';
      case 'total_anxiety_index':
        return 'Total';
      default:
        return '';
    }
  }
  getPropertySafely(obj: any, propertyName: string): any {
    return obj && typeof obj === 'object' && propertyName in obj
      ? obj[propertyName]
      : null;
  }

  calculateMedian(values: number[]): number {
    const sorted = values.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
      return sorted[middle];
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
}
