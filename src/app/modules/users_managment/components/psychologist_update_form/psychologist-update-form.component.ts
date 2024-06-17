import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdatePsychologistDto } from '../../../../core/models/rest/dtos/psychologist/update-psychologist.dto';
import { UserManagementService } from '../../../../core/services/user-management/user-management.service';
import { GetPsychologistDto } from '../../../../core/models/rest/dtos/psychologist/get-psychologist.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-psychologist-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './psychologist-update-form.component.html',
  styleUrl: './psychologist-update-form.component.scss',
})
export class UpdatePsychologistFormComponent implements OnInit{
  @Output() cedulaValueEvent = new EventEmitter<string>();
  @Output() formSubmittedUpdateEvent = new EventEmitter<UpdatePsychologistDto>();

  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userManagementService: UserManagementService

    ) {

    }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const cedula = params['cedula'];
      this.loadData(cedula);
    });
  }

  loadData(cedula: string): void {
    this.userManagementService.getByIdPsychologist(cedula).subscribe({
      next: (data: GetPsychologistDto) => {
        this.UpdatePsychologistform.patchValue(data);
        this.cedula.disable();

        // Establecer la contraseña como deshabilitada inicialmente
        this.UpdatePsychologistform.get('password')?.disable();
      },
      error: (error) => {
        console.error('Error al obtener los detalles del psicólogo', error);
      }
    });

  }

  // Form validation
  UpdatePsychologistform = this.formBuilder.group({
    cedula: [{ value: '', disabled: true }, [Validators.required]],
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ],
    ],
    sex: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: [
      '',
      [Validators.minLength(8), Validators.maxLength(20)],
    ],
    changePassword:[false],
  });

  // Getters
  get cedula() {
    return this.UpdatePsychologistform.get('cedula') as FormControl;
  }
  get name() {
    return this.UpdatePsychologistform.get('name') as FormControl;
  }

  get email() {
    return this.UpdatePsychologistform.get('email') as FormControl;
  }

  get sex() {
    return this.UpdatePsychologistform.get('sex') as FormControl;
  }

  get password() {
    return this.UpdatePsychologistform.get('password') as FormControl;
  }

  onChangePasswordCheckboxChange(): void {
    const changePassword = this.UpdatePsychologistform.get('changePassword')?.value;
    if (changePassword) {
      this.password.enable();
    } else {
      this.password.disable();
      this.password.setValue('password'); // Establecer un valor vacío cuando se desactiva el checkbox
    }
  }
  // Update Psychologist
  updatePsychologist() {
    if (this.UpdatePsychologistform.valid) {
      if(!this.UpdatePsychologistform.value.cedula){
        this.UpdatePsychologistform.value.cedula = this.cedula.value;
      }

      if (!this.UpdatePsychologistform.value.password) {
        this.UpdatePsychologistform.value.password = 'password'; // Valor por defecto
      }
      this.cedulaValueEvent.emit(this.UpdatePsychologistform.value.cedula as string);
      this.formSubmittedUpdateEvent.emit(this.UpdatePsychologistform.value as UpdatePsychologistDto);
    } else {
      console.log('Formulario inválido', this.UpdatePsychologistform.value);
    }
  }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
