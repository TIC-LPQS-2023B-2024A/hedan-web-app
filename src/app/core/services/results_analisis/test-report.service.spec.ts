import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestReportDataService } from './test-report.service';
import { TestsReportDto } from '../../models/rest/dtos/response/get-test-report.dto';
import { environment } from '../../../../environments/environment';

describe('TestReportDataService', () => {
  let service: TestReportDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestReportDataService],
    });

    service = TestBed.inject(TestReportDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#loadTestReportData', () => {
    it('should send a GET request and return test report data', () => {
      const mockData: TestsReportDto[] = [
        {
          id: 1,
          child_id: 101,
          psychologist_cedula: '1725345860',
          test_session_id: 101,
          child_age: 6,
          scholar_grade: 1,
          child_sex: 'm',
          date_time_of_answer: new Date('2024-06-21T15:00:00+00:00'),
          test_results: {
            worry_index: 15,
            defensiveness_index: 0,
            total_anxiety_index: 40,
            social_anxiety_index: 8,
            inconsistent_answers_index: 6,
            physiological_anxiety_index: 12,
          },
          time_taken: 300,
        },
        // Otros datos de prueba aquí
      ];

      const cedula = '1725345860';

      service.loadTestReportData(cedula).subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(
        `${environment.apiUrl}/results/${cedula}/test_reports`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    // it('should handle error correctly', () => {
    //   const cedula = '1725345860';

    //   service.loadTestReportData(cedula).subscribe((data) => {
    //     expect(data).toEqual([]);
    //   });

    //   const req = httpMock.expectOne(`${environment.apiUrl}/results/${cedula}/test_reports`);
    //   req.flush('error', { status: 500, statusText: 'Server Error' });
    // });
  });

  describe('#filterExecution', () => {
    it('should update the age filter', () => {
      service.updateFilter(10);
      service.filter$.subscribe((age) => {
        expect(age).toBe(10);
      });
    });

    it('should update the sex filter', () => {
      service.updateFilterSex('m');
      service.filterSex$.subscribe((sex) => {
        expect(sex).toBe('m');
      });
    });

    it('should update the child ID filter', () => {
      service.updateFilterChildID(101);
      service.filterChildID$.subscribe((childID) => {
        expect(childID).toBe(101);
      });
    });

    it('should update the scholar grade filter', () => {
      service.updateFilterSchoolarGrade(4);
      service.filterSchoolarGrade$.subscribe((grade) => {
        expect(grade).toBe(4);
      });
    });
  });
  describe('#dataSubscribe', () => {
    it('should set the test data', () => {
      const mockData: TestsReportDto[] = [
        {
          id: 1,
          child_id: 101,
          psychologist_cedula: '1725345860',
          test_session_id: 101,
          child_age: 6,
          scholar_grade: 1,
          child_sex: 'm',
          date_time_of_answer: new Date('2024-06-21T15:00:00+00:00'),
          test_results: {
            worry_index: 15,
            defensiveness_index: 0,
            total_anxiety_index: 40,
            social_anxiety_index: 8,
            inconsistent_answers_index: 6,
            physiological_anxiety_index: 12,
          },
          time_taken: 300,
        },
        // Otros datos de prueba aquí
      ];

      service.setTestData(mockData);
      service.testData$.subscribe((data) => {
        expect(data).toEqual(mockData);
      });
    });
  });
});
