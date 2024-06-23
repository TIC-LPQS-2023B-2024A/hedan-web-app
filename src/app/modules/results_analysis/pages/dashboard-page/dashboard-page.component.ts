import { Component, OnInit } from '@angular/core';
import { ChildsBySchoolarGrade } from '../../components/charts/childs-by-schoolar-grade-chart/childs-by-schoolar-grade.component';
import { FilterAgeComponent } from '../../components/filters/age-filter/age-filter.componet';
import { TestReportDataService } from '../../../../core/services/results_analisis/test-report.service';
import { FilterSchoolarGradeComponent } from '../../components/filters/schoolar-grade-filter/schoolar-grade-filter.componet';
import { FilterSexComponent } from '../../components/filters/sex-filter/sex-filter.component';
import { MedianIndexComponent } from '../../components/charts/median-index-by-sex-chart/median-index.component';
import { ChildsBySexComponent } from '../../components/charts/childs-by-sex-chart/childs-by-sex.component';
import { FilterChildIDComponent } from '../../components/filters/child-id-filter/child-id-filter.componet';
import { AnxietyChartComponent } from '../../components/charts/index-anxiety-by-child-chart/anxiety-chart.component';
import { TotalChildComponent } from '../../components/charts/total-child-chart/total-child.component';
import { IncorrectQuestionnairesComponent } from '../../components/charts/number-incorrect-questionnaires/number-incorrect-questionnaires.component';
import { FilterSchemaComponent } from '../../components/filters/schema-filter/schema-filter.component';
import { ColorSchemeService } from '../../../../core/services/results_analisis/color-schema.service';
import { SessionService } from '../../../../core/services/auth/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    FilterAgeComponent,
    FilterChildIDComponent,
    FilterSchoolarGradeComponent,
    FilterSexComponent,
    MedianIndexComponent,
    ChildsBySexComponent,
    ChildsBySchoolarGrade,
    AnxietyChartComponent,
    TotalChildComponent,
    IncorrectQuestionnairesComponent,
    FilterSchemaComponent,
    CommonModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  cedula: string = '';
  showInfo1: boolean = false;
  showInfo2: boolean = false;
  showInfo3: boolean = false;
  showInfo4: boolean = false;
  showInfo5: boolean = false;
  showInfo6: boolean = false;

  constructor(
    private dataService: TestReportDataService,
    private colorSchemeService: ColorSchemeService,
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
    // Cargar los datos iniciales
    this.loadTestData();

    // Suscribirse a testData$ para obtener datos actualizados
    this.dataService.testData$.subscribe((data) => {
      console.log('Test Data:', data);
      // Aquí puedes actualizar el estado del componente con los datos
    });
  }

  onAgeFilterChange(age: number) {
    this.dataService.updateFilter(age);
    console.log('Age Filter', age);
  }

  onSchoolarGradeFilterChange(schoolarGrade: number) {
    this.dataService.updateFilterSchoolarGrade(schoolarGrade);
    console.log('Schoolar Grade Filter', schoolarGrade);
  }

  onSexFilterChange(sex: string) {
    this.dataService.updateFilterSex(sex);
    console.log('Schoolar Grade Filter', sex);
  }

  onSchemaFilterChange(scheme: string) {
    this.colorSchemeService.updateColorScheme(scheme);
    console.log('Schema Filter', scheme);
  }

  onChildIDFilterChange(childID: number) {
    this.dataService.updateFilterChildID(childID);
    console.log('Child ID Filter', childID);
  }

  loadTestData() {
    this.cedula = this.sessionService.userData!.cedula;
    this.dataService.loadTestReportData(this.cedula).subscribe((data) => {
      this.dataService.setTestData(data);
    });
  }
}
