import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  killSubscription = new Subject();
  error: string = '';
  isLoading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required], Validators.email],
      password: ['', [Validators.required], Validators.minLength(6)],
    });
  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.registerForm.pending) {
      let message = '';
      this.registerForm.get('email')?.hasError('required') ? message += `Email is required.` : '';
      this.registerForm.get('email')?.hasError('invalidEmail') ? message += `\nInvalid email.` : '';
      this.registerForm.get('password')?.hasError('required') ? message += `\nPassword is required.` : '';
      this.registerForm.get('password')?.hasError('minLength') ? message += `\nPassword must be at least 8 characters!` : '';
      this.error = message;
      return;
    }

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.isLoading = true;
    this.authService.register({ email, password }).subscribe(
      user => {
        this.store.dispatch(auth_success({
          _id: user._id,
          email: user.email,
        }));
        this.isLoading = false;
        this.registerForm.reset();
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
