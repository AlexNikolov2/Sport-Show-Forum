import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { sameValueAsFactory } from 'src/app/shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  submitted: boolean = false;
  loginForm!: FormGroup;
  redirectTo: string | undefined;
  serverErr: string | undefined = undefined;
  loginsub$: Subscription | undefined;


  constructor(private formbuilder: FormBuilder,
    private userService: UserService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const { redirectTo } = this.activatedRoute.snapshot.queryParams;
    if(redirectTo) {
      this.redirectTo = redirectTo;
    }
  }
  ngOnDestroy(): void {
    this.loginsub$?.unsubscribe();
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.loginsub$ = this.userService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate([(`/${this.redirectTo || ''}` || '/')]);
      },
      error: (err) => {
        console.log(err.error.message);
        this.serverErr = err.error.message;
        setTimeout(() => this.serverErr = undefined, 2000);
      }
    })
  }
  
}
