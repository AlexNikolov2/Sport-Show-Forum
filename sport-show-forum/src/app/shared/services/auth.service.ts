import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localStorage = localStorage;

  constructor(
    private http: HttpClient
  ) { }

  
}
