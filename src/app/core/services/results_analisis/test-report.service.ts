import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { TestsReportDto } from '../../models/rest/dtos/response/get-test-report.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestReportDataService {
  private testDataSubject = new BehaviorSubject<TestsReportDto[]>([]);
  private filterSubject = new BehaviorSubject<number>(0);
  private filterSchoolarGradeSubject = new BehaviorSubject<number>(0);
  private filterSexSubject = new BehaviorSubject<string>(''); // Añadido para el filtro de sexo
  private filterChildIDSubject = new BehaviorSubject<number>(0);
  private readonly testsReportUrl = `${environment.apiUrl}/results`;

  testData$ = this.testDataSubject.asObservable();
  filterSchoolarGrade$ = this.filterSchoolarGradeSubject.asObservable();
  filter$ = this.filterSubject.asObservable();
  filterSex$ = this.filterSexSubject.asObservable(); // Observable para el filtro de sexo
  filterChildID$ = this.filterChildIDSubject.asObservable();

  constructor(private http: HttpClient) {}



  loadTestReportData(cedula: string): Observable<TestsReportDto[]> {
    // Simula una llamada a un API para obtener los datos
    // const testData: PsychologicalTestData[] = [ /* ... */ ];
    // this.testDataSubject.next(testData);
    // return this.testData$;
    const url = `${this.testsReportUrl}/${cedula}/test_reports`
    return this.http.get<TestsReportDto[]>(url, { withCredentials: true });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  updateFilter(age: number): void {
    this.filterSubject.next(age);
  }

  updateFilterSex(sex: string): void {
    // Método para actualizar el filtro de sexo
    this.filterSexSubject.next(sex);
  }

  updateFilterChildID(childID: number): void {
    this.filterChildIDSubject.next(childID);
  }

  updateFilterSchoolarGrade(schoolarGrade: number): void {
    this.filterSchoolarGradeSubject.next(schoolarGrade);
  }

  setTestData(data: TestsReportDto[]): void {
    this.testDataSubject.next(data);
  }
}
