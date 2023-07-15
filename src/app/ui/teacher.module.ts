import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from '../teacher/teacher.component';
@NgModule({
  declarations: [
    TeacherComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  bootstrap: [],
  exports: [TeacherComponent]
})
export class TeacherModule { }
