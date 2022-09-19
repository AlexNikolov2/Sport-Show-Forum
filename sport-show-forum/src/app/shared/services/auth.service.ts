import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localStorage = localStorage;

  constructor(
    private http: HttpClient
  ) { }

  login(userData: {email: string, password: string}): Observable<IUser>{
    return this.http.post<IUser>(environment.api_url + 'user/login', userData, {withCredentials: true});
  }

  register(userData: {email: string, password: string}): Observable<IUser>{
    return this.http.post<IUser>(environment.api_url + 'user/register', userData, {withCredentials: true});
  }

  logout(): Observable<null>{
    return this.http.get<null>(environment.api_url + 'user/logout', {withCredentials: true})
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);    
    return user !== null;
  }

  getUserEmail(): string{
    const user = JSON.parse(localStorage.getItem('user')!);   
    return user.email;
  }
  
  
}
