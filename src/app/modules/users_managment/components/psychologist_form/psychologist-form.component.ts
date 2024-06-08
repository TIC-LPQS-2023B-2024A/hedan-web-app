import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { cedulaValidator } from './psychologist-form.validators';
import { CommonModule } from '@angular/common';
import { CreatePsychologistDto } from '../../../../core/models/rest/dtos/psychologist/create-psychologist.dto';

@Component({
  selector: 'app-questionnarie-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './psychologist-form.component.html',
  styleUrl: './psychologist-form.component.scss',
})
export class PsychologistFormComponent{
  @Output() formSubmitted = new EventEmitter<CreatePsychologistDto>();


  hidePassword: boolean = true;

  constructor(private formBuilder: FormBuilder) {}

  // Form validation
  Questionnarieform = this.formBuilder.group({
    cedula: [
      '',
      [
        Validators.required,
        cedulaValidator(),
      ],
    ],
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ],
    ],
    gender: ['', [Validators.required]],
    email: ['', [Validators.email,Validators.required]],
    password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  });

  //Getters
  get cedula() {
    return this.Questionnarieform.get('cedula') as FormControl;
  }
  get name() {
    return this.Questionnarieform.get('name') as FormControl;
  }

  get email() {
    return this.Questionnarieform.get('email') as FormControl;
  }

  get gender() {
    return this.Questionnarieform.get('gender') as FormControl;
  }

  get password() {
    return this.Questionnarieform.get('password') as FormControl;
  }


  // Create patient
  createPsychologist() {
    // Send data
    if (this.Questionnarieform.valid) {


      console.log(this.Questionnarieform.value);
      this.formSubmitted.emit();
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }



}
