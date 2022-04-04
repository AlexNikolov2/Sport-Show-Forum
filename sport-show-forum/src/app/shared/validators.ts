import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = emailRegex.test(control.value);
  return valid ? null : { email: true };
}

export function sameValueAsFactory(getPassControl: () => AbstractControl | null) {
    let subscription: Subscription | null = null;
    return (control: AbstractControl): ValidationErrors | null => {
    const passControl = getPassControl();
    if(!passControl) { return null; }
    subscription = passControl.valueChanges.subscribe({
      next: () => {
        control.updateValueAndValidity();
      },
      complete: () => {
        subscription?.unsubscribe();
        subscription = null;
      }
    })
    const passValue = passControl.value;
    const repassValue = control.value;
    return passValue == repassValue ? null : { passMatch: true };
  }
}

