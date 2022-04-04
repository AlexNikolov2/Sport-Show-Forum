import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = emailRegex.test(control.value);
  return valid ? null : { email: true };
}

export function sameValueAsFactory(getTargetControl: () => AbstractControl | null, killSubscriptions: Observable<any>) {
    let subscription: Subscription | null = null;
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return of({}).pipe(
            map(() => {
                if (subscription) { subscription.unsubscribe(); subscription = null; }
                const targetControl = getTargetControl();
                if (!targetControl) { return null; }
                subscription = targetControl.valueChanges
                    .pipe(
                        takeUntil(killSubscriptions),
                    )
                    .subscribe({
                        next: () => { control.updateValueAndValidity(); },
                        complete: () => { subscription = null; }
                    });

                return targetControl?.value === control?.value ? null : { sameValue: true }
            })
        )
    };
}

