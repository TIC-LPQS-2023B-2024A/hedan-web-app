import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePatientDto } from '../../models/dtos/patients/CreatePatientDto';
import { environment } from '../../../../environments/environment';
import { PatientDto } from '../../models/dtos/patients/PatientDto';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private readonly patientsUrl = `${environment.apiUrl}/psychologists`;

  constructor(private http: HttpClient) { }

  addChild(psychologistCedula: string, patient: CreatePatientDto): Observable<number>{
    const url = `${this.patientsUrl}/${psychologistCedula}/children`;
    return this.http.post<number>(url, patient, { withCredentials: true });	
  }

  getChildren(psychologistCedula: string): Observable<PatientDto[]>{
    const url = `${this.patientsUrl}/${psychologistCedula}/children`;
    return this.http.get<PatientDto[]>(url, { withCredentials: true });
  }

}
