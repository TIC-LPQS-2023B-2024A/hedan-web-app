import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(minYears: number, maxYears: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; 
    }

    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    const minDate = new Date(currentDate.getFullYear() - maxYears, currentDate.getMonth(), currentDate.getDate());
    const maxDate = new Date(currentDate.getFullYear() - minYears, currentDate.getMonth(), currentDate.getDate());

    if (selectedDate < minDate || selectedDate > maxDate) {
      return { dateRange: true }; 
    }
    return null; 
  };
}
