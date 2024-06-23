import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'schema-filter',
  standalone: true,
  templateUrl: './schema-filter.component.html',
  styleUrls: ['./schema-filter.component.scss']
})
export class FilterSchemaComponent {
  @Output() schemaFilterChanged = new EventEmitter<string>();

  onSchemaFilterChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const schema = (target.value).toString(); // Parse input value to integer
    if ((schema) !== null) { // Check if age is a valid number
      this.schemaFilterChanged.emit(schema);
    }  }
}
