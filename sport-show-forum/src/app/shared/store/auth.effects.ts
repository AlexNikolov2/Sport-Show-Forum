import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { }
}