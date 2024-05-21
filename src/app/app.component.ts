import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateComponent } from './shared/layouts/template/template.component';
import { QuestionnarieFormComponent } from './modules/questionnaires/components/questionnarie-form/questionnarie-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, TemplateComponent, QuestionnarieFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hedan-web-app';
}
