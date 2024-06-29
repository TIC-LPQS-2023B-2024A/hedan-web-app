import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { InvitationLink } from '../../models/dtos/questionnaires/invitation-link';
import { environment } from '../../../../environments/environment';
import { TestSessionDto } from '../../models/dtos/questionnaires/test-session-dto';
import { TestResult } from '../../models/dtos/questionnaires/test-result-dto';

@Injectable({
  providedIn: 'root'
})
export class QuestionnairesService {
  private readonly questionnariesUrl = `${environment.apiUrl}/questionnaires`;

  constructor(private http: HttpClient) { }

  getInvitationLink(childId: number, psychologistCedula: string): Observable<string>{
    const url = `${this.questionnariesUrl}/token/${childId}/${psychologistCedula}`;
    return this.http.get<string>(url, { withCredentials: true });
  }

  getTestSessions(psychologistCedula: string): Observable<TestSessionDto[]>{
    const url = `${this.questionnariesUrl}/${psychologistCedula}/test_sessions`;
    return this.http.get<TestSessionDto[]>(url, { withCredentials: true });
  }

  getTestResult(testId: number, psychologistCedula: string): Observable<TestResult>{
    const url = `${this.questionnariesUrl}/resultado/${testId}`;
    return this.http.get<TestResult>(url, { withCredentials: true });
  }

  deleteTestSession(testId: number, psychologistCedula: string): Observable<boolean> {
    const url = `${this.questionnariesUrl}/${psychologistCedula}/${testId}`;
    return this.http.delete(url, { observe: 'response', withCredentials: true }).pipe(
      map((response: HttpResponse<any>) => response.status === 200),
      catchError((error: HttpErrorResponse) => {
        alert('Error al eliminar el test' + error);
        return of(false);
      })
    );
  }
}
