import { Component } from '@angular/core';
import { QuestionnarieFormComponent } from '../../components/questionnarie-form/questionnarie-form.component';
import { RouterOutlet } from '@angular/router';
import { LinkModalComponent } from '../../components/link-modal/link-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-questionnarie',
  standalone: true,
  imports: [RouterOutlet, QuestionnarieFormComponent, LinkModalComponent, CommonModule],
  templateUrl: './new-questionnarie.component.html',
  styleUrl: './new-questionnarie.component.scss'
})
export class NewQuestionnarieComponent {

  isModalVisible = false;

  onFormSubmitted() {
    this.isModalVisible = true;
  }

  onCloseContainer() {
    this.isModalVisible = false;
  }

}
