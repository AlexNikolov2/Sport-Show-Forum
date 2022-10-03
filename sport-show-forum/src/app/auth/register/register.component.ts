import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authService.register(this.form.controls['email'].value, /*this.form.controls['password'].value*/);
    localStorage.setItem('id', 'user')
    console.log(localStorage);
    this.form.reset();
    this.router.navigate(['/all-posts']);
  }
}