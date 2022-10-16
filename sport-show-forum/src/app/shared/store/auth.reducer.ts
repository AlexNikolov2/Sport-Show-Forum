import { createReducer, on, Action } from "@ngrx/store";

import { IUser } from '../../shared/interfaces/user';

import * as AuthActions from './auth.actions';

export interface AuthState {
    user: IUser | null;
    message: AuthActions.msgProps | null;
}

export const featureKey = 'auth';

const initialState: AuthState = {
    user: null,
    message: null
};

const _authReducer = createReducer(
    initialState,
    on(AuthActions.auth_success, (state, action) => {
        return {
            ...state,
            user: {
                email: action.email,
                _id: action._id,
            }
        }
    }),
    on(AuthActions.auth_check_fail, (state) => {
        return {
            ...state,
            user: null
        }
    }),
    on(AuthActions.add_message, (state, action) => {
        return {
            ...state,
            message: action
        }
    }),
    on(AuthActions.clear_message, (state) => {
        return {
            ...state,
            message: null
        }
    }),
    on(AuthActions.logout_user, (state) => {
        return {
            ...state,
            user: null
        }
    })
)

export function authReducer<ActionReducer>(state: AuthState | undefined, action: Action): AuthState {
    return _authReducer(state, action);
}