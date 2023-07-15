import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, shareReplay, take } from 'rxjs';
import { Teacher } from './teacher';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  apiUrl = 'http://localhost:3000/teachers';
  constructor(private _http:HttpClient) {}

  public getAllTeachers(): Observable<Teacher[]>{
    return this._http.get<Teacher[]>(this.apiUrl).pipe(
      catchError((err: any) => {
        console.warn('Error occurred while get role from data base');
        return EMPTY;
      }), take(1),
      shareReplay(1));
  }
}
