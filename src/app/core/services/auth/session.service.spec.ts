import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { UserData } from '../../models/session/user-data';

describe('SessionServiceTest', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService]
    });

    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get userData correctly', () => {
    const userData: UserData = { cedula: '1725345860', name: 'Anthony Simbaña', role: 'psychologist' };

    service.userData = userData;

    expect(service.userData).toEqual(userData);
  });

  it('should return true for isAuthenticated when userData is set', () => {
    const userData: UserData = { cedula: '1725345860', name: 'Anthony Simbaña', role: 'Psychologist' };

    service.userData = userData;

    expect(service.isAuthenticated).toBeTrue();
  });

  it('should return false for isAuthenticated when userData is null', () => {
    service.logout();

    expect(service.isAuthenticated).toBeFalse();
  });

  it('should clear userData on logout', () => {
    const userData: UserData = { cedula: '1725345860', name: 'Anthony Simbaña', role: 'Psychologist' };

    service.userData = userData;
    service.logout();

    expect(service.userData).toBeNull();
  });
});
