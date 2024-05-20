import { Component, ViewChild } from '@angular/core';
import { PsychologistFormComponent } from '../../components/psychologist-form/psychologist-form.component';
//import { CustomersService } from '../../../../core/services/rest/customers/customers.service';
import { CreatePsychologistDto } from '../../../../core/models/rest/dtos/psychologist/create-psychologist.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-psychologist-page',
  standalone: true,
  imports: [PsychologistFormComponent],
  templateUrl: './new-psychologist-page.component.html',
  styleUrl: './new-psychologist-page.component.css',
})
export class NewPsychologistPageComponent {
  @ViewChild(PsychologistFormComponent)
  psychologistFormComponent!: PsychologistFormComponent;

   constructor(
     //private customersService: PsychologistFormComponent,
     private router: Router
   ) {}

   onCreateSubmit(customer: CreatePsychologistDto) {
//     //this.customersService.createCustomer(customer).subscribe({
//     //  next: () => {
//     //    this.customerFormComponent.resetForm();
//     //    this.router.navigate(['../']);
//     //  },
//     //  error: () => {},
//     //});
   }
}
