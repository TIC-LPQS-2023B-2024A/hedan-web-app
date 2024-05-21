import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-questionnarie-form',
  standalone: true,
  imports: [],
  templateUrl: './questionnarie-form.component.html',
  styleUrl: './questionnarie-form.component.scss',
})
export class QuestionnarieFormComponent {
  questionnaireForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.questionnaireForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      gradoEscolar: ['', Validators.required],
      motivoTest: ['', Validators.required],
      remitente: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.questionnaireForm.valid) {
      console.log(this.questionnaireForm.value);
      // Aquí puedes manejar el envío del formulario, como enviar los datos a un servidor
    }
  }
}
