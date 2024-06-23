import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'schoolar-grade-filter',
  standalone: true,
  templateUrl: './schoolar-grade-filter.component.html',
  styleUrls: ['./schoolar-grade-filter.component.scss']
})
export class FilterSchoolarGradeComponent {
  @Output() schoolarGradeFilterChanged = new EventEmitter<number>();

  onSchoolarGradeFilterChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const schoolarGrade = parseInt(target.value); // Parse input value to integer
    if (!isNaN(schoolarGrade)) { // Check if age is a valid number
      this.schoolarGradeFilterChanged.emit(schoolarGrade);
    }
  }
}
