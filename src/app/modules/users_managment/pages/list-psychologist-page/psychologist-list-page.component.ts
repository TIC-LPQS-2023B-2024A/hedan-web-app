import { Component } from '@angular/core';
import { PsychologistsTableComponent } from '../../components/psychologist-table/psychologist-table.component';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [PsychologistsTableComponent],
  templateUrl: './psychologist-list-page.component.html',
  styleUrl: './psychologist-list-page.component.scss'
})
export class PsychologistListComponent {

}
