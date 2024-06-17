import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePatientDto } from '../../models/dtos/patients/CreatePatientDto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private readonly patientsUrl = `${environment.apiUrl}/psychologists`;

  constructor(private http: HttpClient) { }

  addChild(psychologistCedula: string, patient: CreatePatientDto): Observable<number>{
    const url = `${this.patientsUrl}/${psychologistCedula}/add_child`;
    return this.http.post<number>(url, patient);
  }

}
