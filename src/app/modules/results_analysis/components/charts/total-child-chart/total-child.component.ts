import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { TestReportDataService } from '../../../../../core/services/results_analisis/test-report.service';
import { NgxChartsModule, colorSets } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { TestsReportDto } from '../../../../../core/models/rest/dtos/response/get-test-report.dto';
import { ColorSchemeService } from '../../../../../core/services/results_analisis/color-schema.service';
@Component({
  selector: 'total-childs',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './total-child.component.html',
  styleUrls: ['./total-child.component.scss'],
})
export class TotalChildComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  filteredData: TestsReportDto[] = [];
  nonFilteredData: TestsReportDto[] = [];
  totalChildData: any[] = [];

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

  constructor(
    private dataService: TestReportDataService,
    private colorSchemeService: ColorSchemeService,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {

    // this.subscriptions.add(
    //   this.dataService.testData$.subscribe( data =>{
    //       this.nonFilteredData = data;
    //       this.filteredData = data;
    //       this.updateChart();
    //   }),
    // );


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
        console.log('Filtered Data', this.filteredData);
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
      const matchesAge = age === 0 || data.child_age == age; //age filter
      const matchesSex = sex === '' || data.child_sex === sex; //sex filter
      console.log('Matches', matchesGrade, matchesAge, matchesSex);
      return matchesGrade && matchesAge && matchesSex;
    });
  }

  updateChart() {
    console.log('Total Child Data Chart', this.filteredData);
    const totalRecords = this.filteredData.length; // Type assertion for initial object
    this.totalChildData = [
      {
        name: 'Total pacientes',
        value: totalRecords,
      },
    ];
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
}
