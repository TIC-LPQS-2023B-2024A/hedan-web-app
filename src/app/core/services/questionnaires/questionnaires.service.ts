import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvitationLink } from '../../models/dtos/questionnaires/invitation-link';
import { environment } from '../../../../environments/environment';

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

}
