import { Component, OnInit, Output } from '@angular/core';
import { LoginRequestDto } from '../../../../core/models/rest/dtos/auth/login-request.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {  EventEmitter } from '@angular/core';
import {
  FormControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  @Output() loginEvent: EventEmitter<LoginRequestDto> = new EventEmitter<LoginRequestDto>();

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      role: ['psicologo', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  get role() {
    return this.loginForm.get('role');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  login(): void {
    if (this.loginForm.valid) {
      console.log('Formulario enviado', this.loginForm.value);
      this.loginEvent.emit(this.loginForm.value as LoginRequestDto);
    }else{
      console.log('Formulario inválido', this.loginForm.value);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


}
