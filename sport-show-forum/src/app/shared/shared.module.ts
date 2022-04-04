import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeDiffPipe } from './pipes/time-diff.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { NumCountPipe } from './pipes/num-count.pipe';
import { ErrorComponent } from './error/error.component';
import { PasswordMatchDirective } from './directives/password-match.directive';
import { CustomValidatorDirective } from './directives/custom-validator.directive';



@NgModule({
  declarations: [
    TimeDiffPipe,
    NotFoundComponent,
    ShortenPipe,
    NumCountPipe,
    ErrorComponent,
    PasswordMatchDirective,
    CustomValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotFoundComponent,
  ]
})
export class SharedModule { }
