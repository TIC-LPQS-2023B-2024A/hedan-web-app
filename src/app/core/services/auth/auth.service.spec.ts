import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { environment } from '../../../../environments/environment';
import { LoginRequestDto } from '../../models/rest/dtos/auth/login-request.dto';

describe('AuthServiceTest', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let sessionService: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        SessionService
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    sessionService = TestBed.inject(SessionService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should send a POST request to login the user', () => {
      const loginRequestDto: LoginRequestDto = {role: 'psychologist', username: 'anthony200105@gmail.com', password: '123456789' };

      service.login(loginRequestDto).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loginRequestDto);
      req.flush(null);
    });
  });

  describe('#logout', () => {
    it('should send a POST request to logout the user', () => {
      spyOn(sessionService, 'logout');

      service.logout().subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/auth/logout`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});
      req.flush(null);

      expect(sessionService.logout).toHaveBeenCalled();
    });
  });
});
