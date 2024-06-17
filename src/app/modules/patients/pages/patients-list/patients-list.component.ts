import { Component } from '@angular/core';
import { PatientsTableComponent } from '../../components/patients-table/patients-table.component';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [PatientsTableComponent],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.scss'
})
export class PatientsListComponent {

}
