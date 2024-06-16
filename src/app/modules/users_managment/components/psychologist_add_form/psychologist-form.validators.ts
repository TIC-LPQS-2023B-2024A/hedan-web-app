import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador para cédulas ecuatorianas
export function cedulaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Se elimina cualquier guión o espacio en blanco
    const cleanedValue = value.replace(/[-\s]/g, '');

    // Verifica que el valor sea un número y tenga una longitud válida
    if (!/^\d{10}$/.test(cleanedValue)) {
      return { cedula: true, invalidLength: true };
    }

    // Verifica que los dígitos de verificación sean correctos
    const lastDigit = parseInt(cleanedValue.charAt(cleanedValue.length - 1), 10);
    const digits = cleanedValue.slice(0, -1).split('').map(Number);
    const checksum = digits.reduce((acc: number, digit: number, index: number) => {
      const weight = index % 2 === 0 ? 2 : 1;
      const product = digit * weight;
      return acc + (product >= 10 ? product - 9 : product);
    }, 0);
    const expectedLastDigit = (10 - (checksum % 10)) % 10;

    if (lastDigit !== expectedLastDigit) {
      return { cedula: true, invalidChecksum: true };
    }

    // Si pasa todas las validaciones, retorna null
    return null;
  };
}
