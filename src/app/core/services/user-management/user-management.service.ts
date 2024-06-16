import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreatePsychologistDto } from '../../models/rest/dtos/psychologist/create-psychologist.dto';
import { UpdatePsychologistDto } from '../../models/rest/dtos/psychologist/update-psychologist.dto';
import { GetPsychologistDto } from '../../models/rest/dtos/psychologist/get-psychologist.dto';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private readonly userManagementUrl = `${environment.apiUrl}/users`;
  private readonly psychologistUrl = `${environment.apiUrl}/psychologists`;

  constructor(private http: HttpClient) { }

  addPsychologist(psychologist: CreatePsychologistDto): Observable<any> {
    const url = `${this.userManagementUrl}/psychologists`;
    return this.http.post(url, psychologist, { withCredentials: true });
  }

  updatePsychologist(updatePsychologistDto: UpdatePsychologistDto, psychologistCedula: string): Observable<any> {
    const url = `${this.userManagementUrl}/psychologists/${psychologistCedula}`;
    return this.http.put(url, updatePsychologistDto, { withCredentials: true });
  }

  getPsychologists(): Observable<GetPsychologistDto[]> {
    const url = `${this.psychologistUrl}`;
    return this.http.get<GetPsychologistDto[]>(url,{ withCredentials: true });
  }

  getByIdPsychologist(cedula: string): Observable<GetPsychologistDto> {
    const url = `${this.userManagementUrl}/psychologists/${cedula}?psychologist_cedula=${cedula}`;
    return this.http.get<GetPsychologistDto>(url,{ withCredentials: true });
  }
}
