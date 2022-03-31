import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeDiffPipe } from './pipes/time-diff.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShortenPipe } from './pipes/shorten.pipe';



@NgModule({
  declarations: [
    TimeDiffPipe,
    NotFoundComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotFoundComponent,
  ]
})
export class SharedModule { }
