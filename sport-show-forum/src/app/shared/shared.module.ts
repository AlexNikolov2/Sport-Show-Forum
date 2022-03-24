import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeDiffPipe } from './pipes/time-diff.pipe';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    TimeDiffPipe,
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
