import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreatePsychologistDto } from '../../models/rest/dtos/psychologist/create-psychologist.dto';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private readonly userManagementUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  addPsychologist(psychologist: CreatePsychologistDto): Observable<any> {
    const url = `${this.userManagementUrl}/psychologists`;
    return this.http.post(url, psychologist);
  }

  /**
  getInvitationLink(childId: number, psychologistCedula: string): Observable<InvitationLink>{
    const url = `${this.questionnariesUrl}/token/${childId}/${psychologistCedula}`;
    return this.http.get<InvitationLink>(url);
  }
   */


}
