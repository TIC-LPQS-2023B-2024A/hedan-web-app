import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { dateRangeValidator } from './date-range.validator';
import { CommonModule } from '@angular/common';
import { CreatePatientDto } from '../../../../core/models/dtos/patients/CreatePatientDto';
import { Sex } from '../../../../core/models/enums/sex-enum';

@Component({
  selector: 'app-questionnarie-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './questionnarie-form.component.html',
  styleUrl: './questionnarie-form.component.scss',
})
export class QuestionnarieFormComponent {
  @Output() formSubmitted = new EventEmitter<CreatePatientDto>();
  readonly Sex = Sex;

  constructor(private formBuilder: FormBuilder) {}

  // Form validation
  Questionnarieform = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
      ],
    ],
    date: ['', [Validators.required, dateRangeValidator(6, 9)]],
    gender: ['', [Validators.required]],
    schoolGrade: ['', [Validators.required]],
    reason: ['', [Validators.required]],
    sender: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
      ],
    ],
  });

  //Getters
  get name() {
    return this.Questionnarieform.get('name') as FormControl;
  }
  get date() {
    return this.Questionnarieform.get('date') as FormControl;
  }
  get gender() {
    return this.Questionnarieform.get('gender') as FormControl;
  }
  get schoolGrade() {
    return this.Questionnarieform.get('schoolGrade') as FormControl;
  }
  get reason() {
    return this.Questionnarieform.get('reason') as FormControl;
  }
  get sender() {
    return this.Questionnarieform.get('sender') as FormControl;
  }

  // Create patient
  createPatient() {
    // Create patient
    if (!this.Questionnarieform.valid) {
      return;
    }

    const patientData: CreatePatientDto = {
      name: this.name.value,
      sex: this.gender.value,
      birthdate: this.date.value,
      scholar_grade: this.schoolGrade.value,
      test_sender: this.sender.value,
      test_reason: this.reason.value,
    };

    this.formSubmitted.emit(patientData);
  }
}
