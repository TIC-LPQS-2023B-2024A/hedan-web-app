import { Component, EventEmitter, Output } from '@angular/core';
import { CreatePsychologistDto } from '../../../../core/models/rest/dtos/psychologist/create-psychologist.dto';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-psychologist-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './psychologist-form.component.html',
  styleUrl: './psychologist-form.component.css',
})
export class PsychologistFormComponent {
  @Output() readonly formSubmit = new EventEmitter<CreatePsychologistDto>();

  constructor() {}

  pyschologistForm = new FormGroup({
    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      Validators.pattern(/^[a-zA-Z\s]+$/)]),
    sexFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10),
      Validators.pattern(/^[a-zA-Z\s]+$/)]),
    cedulaFormControl: new FormControl('', [
      Validators.required,
      //Validators.cedula,
      Validators.maxLength(30),
    ])
  });

  get nameFormControl(): FormControl {
    return this.pyschologistForm.controls['nameFormControl'];
  }

  get sexFormControl(): FormControl {
    return this.pyschologistForm.controls['sexFormControl'];
  }

  get cedulaFormControl(): FormControl {
    return this.pyschologistForm.controls['cedulaFormControl'];
  }

  onSubmit(): void {
    if (!this.pyschologistForm.valid) {
      return;
    }
    this.formSubmit.emit({
      name: this.nameFormControl.value,
      sex: this.sexFormControl.value,
      cedula: this.cedulaFormControl.value,
    });
  }

  resetForm(): void {
    this.pyschologistForm.reset();
  }
}
