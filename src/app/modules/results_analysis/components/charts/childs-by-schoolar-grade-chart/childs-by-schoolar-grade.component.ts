import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { TestReportDataService } from '../../../../../core/services/results_analisis/test-report.service';
import { NgxChartsModule, colorSets } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { TestsReportDto } from '../../../../../core/models/rest/dtos/response/get-test-report.dto';
import { ColorSchemeService } from '../../../../../core/services/results_analisis/color-schema.service';
@Component({
  selector: 'childs-by-schoolar-grade',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './childs-by-schoolar-grade.component.html',
  styleUrls: ['./childs-by-schoolar-grade.component.scss'],
})
export class ChildsBySchoolarGrade implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  filteredData: TestsReportDto[] = [];
  nonFilteredData: TestsReportDto[] = [];
  pieChartData: any[] = [];

  view: [number, number] = [390, 100];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendTitle: string = '';
  legendPosition: LegendPosition = LegendPosition.Below;
  colorScheme = colorSets.find((x) => x.name === 'vivid')!;

  constructor(
    private dataService: TestReportDataService,
    private colorSchemeService: ColorSchemeService,
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
    console.log('Childs By Schoolar Chart', this.filteredData);
    const gradeCount = this.filteredData.reduce(
      (acc, data) => {
        const grade = this.getSchoolGrade(data.scholar_grade);
        if (!(grade in acc)) {
          // Use "in" operator for type assertion
          acc[grade] = 0;
        }
        acc[grade]++;
        return acc;
      },
      {} as { [key: string]: number },
    ); // Type assertion for initial object

    this.pieChartData = Object.keys(gradeCount).map((grade) => ({
      name: grade,
      value: gradeCount[grade],
    }));

    console.log('Pie Chart Data', this.pieChartData);
  }

  getSchoolGrade(grade: number): string {
    switch (grade) {
      case 1:
        return '1ro Básica';
      case 2:
        return '2do Básica';
      case 3:
        return '3ro Básica';
      case 4:
        return '4to Básica';
      default:
        return `Grado ${grade}`;
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
