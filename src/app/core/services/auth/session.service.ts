import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  get isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  get role(): string {
    return localStorage.getItem('role') ?? '';
  }
  set role(role: string) {
    localStorage.setItem('role', role);
  }

  set isAuthenticated(isAuthenticated: boolean) {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }
}
