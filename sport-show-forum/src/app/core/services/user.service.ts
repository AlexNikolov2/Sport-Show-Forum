import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import { IUser } from 'src/app/shared/interface/user';

@Injectable()
export class UserService {

  user: IUser | null | undefined = undefined;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { }

  login(data: {email: string; password: string}) {
    return this.http.post<IUser>('/login', data)
      .pipe(
        tap(user => this.user = user),
        catchError(err => {
          throw err;
        })
      );
  }

  register(data: {username: string; email: string; password: string; img: string; description: string}) {
    return this.http.post<IUser>('/register', data)
      .pipe(
        tap(user => this.user = user),
        catchError(err => {
          throw err;
        })
      );
  }

  logout() {
    return this.http.post('/logout', {})
      .pipe(
        tap(() => this.user = undefined),
        catchError(err => {
          throw err;
        })
      );
  }

  getUser() {
    return this.http.get<IUser>('/user')
      .pipe(
        tap(user => this.user = user),
        catchError(err => {
          throw err;
        })
      );
  }
}
