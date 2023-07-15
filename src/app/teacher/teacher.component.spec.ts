import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TeacherComponent } from './teacher.component';
import { TeacherService } from '../ui/teacher.service';
import { of, throwError } from 'rxjs';

describe('TeacherComponent', () => {
  let component: TeacherComponent;
  let teacherService: TeacherService;
  let fixture: ComponentFixture<TeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherComponent],
      providers: [TeacherService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherComponent);
    teacherService = TestBed.inject(TeacherService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve teachers and assign them to teachersObj', () => {
    const mockTeachers = [
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

    spyOn(teacherService, 'getAllTeachers').and.returnValue(of(mockTeachers));
    component['getTeachers']();
    expect(teacherService.getAllTeachers).toHaveBeenCalled();
    expect(component.teachersObj.length).toEqual(2);
  });

  it('should handle error and return EMPTY', () => {
    const mockError = new Error('Some error');
    spyOn(teacherService, 'getAllTeachers').and.returnValue(throwError(mockError));
    component['getTeachers']();
    expect(teacherService.getAllTeachers).toHaveBeenCalled();
    expect(component.teachersObj).toEqual([]);
  });
});
