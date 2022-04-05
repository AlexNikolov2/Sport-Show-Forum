import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import { IUser } from 'src/app/shared/interface/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  user: IUser | null | undefined = undefined;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { }

  login(data: {email: string; password: string}) {
    return this.http.post<IUser>(environment.api_url + '/user/login', data, { withCredentials: true })
      .pipe(
        tap(user => this.user = user),
        catchError(err => {
          throw err;
        })
      );
  }

  register(data: {username: string; email: string; password: string; avatar: string; description: string}) {
    return this.http.post<IUser>(environment.api_url + '/user/register', data)
      .pipe(
        tap(user => this.user = user),
        catchError(err => {
          throw err;
        })
      );
  }

  logout() {
    return this.http.post('/user/logout', {})
      .pipe(
        tap(() => this.user = null),
        catchError(err => {
          throw err;
        })
      );
  }

  getUser() {
    return this.http.get<IUser>(environment.api_url + '/user/profile')
      .pipe(
        tap(user => this.user = user),
        catchError(err => {
          throw err;
        })
      );
  }
}
