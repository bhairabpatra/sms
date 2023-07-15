import { TestBed } from '@angular/core/testing';
import { TeacherService } from './teacher.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
describe('TeacherService', () => {
  let service: TeacherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeacherService],
    }).compileComponents();
    service = TestBed.inject(TeacherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call getAllTeachers', () => {
    spyOn(console, 'warn');
    const teacherMock = [
      {
        id: 1,
        fname: 'Bhairab',
        lname: 'Patra',
        age: 30,
        phone: 9999999999,
        gender: 'Male',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
        },
      },
      {
        id: 1,
        fname: 'Runa',
        lname: 'Patra',
        age: 20,
        phone: 9999999999,
        gender: 'Male',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
        },
      }
    ];

    service.getAllTeachers().subscribe((res) => {
      expect(res.length).toEqual(2);
      expect(console.warn).toHaveBeenCalledTimes(0);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(teacherMock);
  });

  it('should handle an error and return an empty observable', () => {
    spyOn(console, 'warn');
    const errorMessage = 'Error occurred while get role from data base';

    service.getAllTeachers().subscribe({
      error: (error: any) => {
        expect(console.warn).toHaveBeenCalledWith(errorMessage);
        expect(error).toBe(errorMessage);
      },
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error', { message: errorMessage }));
  });
});
