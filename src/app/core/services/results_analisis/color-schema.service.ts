import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService {
  colorSchemeSubject = new BehaviorSubject<string>('cool');
  colorScheme$ = this.colorSchemeSubject.asObservable();

  updateColorScheme(colorScheme: string): void{
    this.colorSchemeSubject.next(colorScheme);
  }
}
