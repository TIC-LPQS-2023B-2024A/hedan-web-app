import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sex-filter',
  standalone: true,
  templateUrl: './sex-filter.component.html',
  styleUrls: ['./sex-filter.component.scss'],
})
export class FilterSexComponent {
  @Output() sexFilterChanged = new EventEmitter<string>();
  //Method for filter by sex
  onSexFilterChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const sex = target.value.toString(); // Parse input value to string
    if (sex !== null) { //Sex is not null
      this.sexFilterChanged.emit(sex);
    }
  }
}
