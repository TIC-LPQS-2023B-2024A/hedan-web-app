import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserManagementService } from './user-management.service';
import { environment } from '../../../../environments/environment';
import { CreatePsychologistDto } from '../../models/rest/dtos/psychologist/create-psychologist.dto';
import { UpdatePsychologistDto } from '../../models/rest/dtos/psychologist/update-psychologist.dto';
import { GetPsychologistDto } from '../../models/rest/dtos/psychologist/get-psychologist.dto';
import { UserData } from '../../models/session/user-data';

describe('UserManagementService', () => {
  let service: UserManagementService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserManagementService]
    });

    service = TestBed.inject(UserManagementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#addPsychologist', () => {
    it('should send a POST request to add a psychologist', () => {
      const mockPsychologist: CreatePsychologistDto = {
        cedula: '1718269838',
        name: 'Monica Morales',
        sex: 'f',
        email: 'monica@monica.com',
        password: '123456789'
      };

      service.addPsychologist(mockPsychologist).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/users/psychologists`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockPsychologist);
      expect(req.request.withCredentials).toBeTrue();
      req.flush({});
    });
  });

  describe('#updatePsychologist', () => {
    it('should send a PUT request to update a psychologist', () => {
      const mockUpdate: UpdatePsychologistDto = {
        name: 'Luis Updated',
        sex: 'm',
        email: 'luis@luis.com',
        password: 'securePassword',
        changePassword: false
      };
      const mockCedula = '1718269838';

      service.updatePsychologist(mockUpdate, mockCedula).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/users/psychologists/${mockCedula}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockUpdate);
      expect(req.request.withCredentials).toBeTrue();
      req.flush({});
    });
  });

  describe('#getPsychologists', () => {
    it('should send a GET request to retrieve all psychologists', () => {
      const mockPsychologists: GetPsychologistDto[] = [
        {
          "cedula": "1725345860",
          "name": "Anthony Josue",
          "sex": "m",
          "email": "anthonymales200105@gmail.com"
        },
        {
          "cedula": "1716414121",
          "name": "Luis Simbana",
          "sex": "m",
          "email": "luis@luis.com"
        }
      ];

      service.getPsychologists().subscribe((data) => {
        expect(data).toEqual(mockPsychologists);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/psychologists`);
      expect(req.request.method).toBe('GET');
      expect(req.request.withCredentials).toBeTrue();
      req.flush(mockPsychologists);
    });
  });

  describe('#getByIdPsychologist', () => {
    it('should send a GET request to retrieve a psychologist by ID', () => {
      const mockPsychologist: GetPsychologistDto = {
        "cedula": "1725345860",
        "name": "Anthony Josue",
        "sex": "m",
        "email": "anthonymales200105@gmail.com"
      };
      const mockCedula = '1725345860';

      service.getByIdPsychologist(mockCedula).subscribe((data) => {
        expect(data).toEqual(mockPsychologist);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/psychologists/${mockCedula}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.withCredentials).toBeTrue();
      req.flush(mockPsychologist);
    });
  });

  describe('#getCurrentUser', () => {
    it('should send a GET request to retrieve current user data', () => {
      const mockUser: UserData = {
        cedula: "null",
        role: "admin",
        name: ""
      };

      service.getCurrentUser().subscribe((data) => {
        expect(data).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users/me`);
      expect(req.request.method).toBe('GET');
      expect(req.request.withCredentials).toBeTrue();
      req.flush(mockUser);
    });
  });
});
