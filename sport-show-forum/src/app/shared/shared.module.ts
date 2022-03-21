import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeDiffPipe } from './pipes/time-diff.pipe';



@NgModule({
  declarations: [
    TimeDiffPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
