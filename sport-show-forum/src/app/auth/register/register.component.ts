import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { auth_success } from 'src/app/shared/store/auth.actions';
import { GlobalState } from "../../shared/interfaces/global-state";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: UntypedFormGroup;
  killSubscription = new Subject<void>();
  error: string = '';
  isLoading: boolean = false;
  
  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<GlobalState>,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required], Validators.email],
      password: ['', [Validators.required], Validators.minLength(6)],
    });
  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.pending) {
      let message = '';
      this.form.get('email')?.hasError('required') ? message += `Email is required.` : '';
      this.form.get('email')?.hasError('invalidEmail') ? message += `\nInvalid email.` : '';
      this.form.get('password')?.hasError('required') ? message += `\nPassword is required.` : '';
      this.form.get('password')?.hasError('minLength') ? message += `\nPassword must be at least 8 characters!` : '';
      this.error = message;
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;
    this.isLoading = true;
    this.authService.register({ email, password }).subscribe(
      user => {
        this.store.dispatch(auth_success({
          _id: user._id,
          email: user.email,
        }));
        this.isLoading = false;
        this.form.reset();
        this.router.navigateByUrl('/');
      },
      error => {
        this.isLoading = false;
        if (error.status === 0 || error.status === 500) {
          this.error = 'Something went wrong. Please try again later.'
        } else {
          this.error = error.error.message;
        }
      }
    )
  }

  onCloseNotification(): void {
    this.error = '';
  }
}
