import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../ui/teacher.service';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Teacher } from '../ui/teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  private _teacherSubscription: Subscription | undefined;
  public teachersObj: Teacher[] =[];
  constructor(private _teacherService: TeacherService) {}

  ngOnInit(): void {
    this.getTeachers();
  }

  private getTeachers(): void {
    this._teacherSubscription = this._teacherService
      .getAllTeachers()
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      )
      .subscribe((teacherObject: Teacher[]) => {
        console.log(teacherObject);
        this.teachersObj = teacherObject;
      });
  }
  ngOnDestroy(): void {
    this._teacherSubscription?.unsubscribe();
  }
}
