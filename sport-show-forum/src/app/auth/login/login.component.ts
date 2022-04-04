import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm!: FormGroup;

  constructor() { }

  login(form: NgForm): void{
    if(form.invalid){
      return;
    }
    
  }
  onSubmit(): void{}

}
