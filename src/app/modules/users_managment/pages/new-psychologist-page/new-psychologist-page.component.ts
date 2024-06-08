import { Component } from '@angular/core';
import { PsychologistFormComponent } from '../../components/psychologist_form/psychologist-form.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-questionnarie',
  standalone: true,
  imports: [RouterOutlet,PsychologistFormComponent, CommonModule],
  templateUrl: './new-psychologist-page.component.html',
  styleUrl: './new-psychologist-page.component.scss',
})
export class NewPsychologistComponent {

  isModalVisible = false;

  onFormSubmitted() {
    //this.isModalVisible = true;
  }

  onCloseContainer() {
    //this.isModalVisible = false;
  }

}
