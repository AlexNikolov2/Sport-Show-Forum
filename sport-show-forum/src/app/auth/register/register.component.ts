import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { sameValueAsFactory } from 'src/app/shared/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  submitted: boolean = false;
  registerForm!: FormGroup;
  registersub$: Subscription | undefined;
  activatedRoute: ActivatedRoute | null | undefined;

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6), sameValueAsFactory( () => this.registerForm?.get('password'))]],
      avatar: ['', [Validators.required]],
      description: ['']
    });
    
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.registersub$ = this.userService.register(this.registerForm.value).subscribe(
      () => {
        
        this.registerForm.reset();
        this.router.navigate(['/all-posts']);
      },
      err => {
        console.log(err);
      }
    );
    localStorage.setItem('user', JSON.stringify(this.userService.user));
  }
}

