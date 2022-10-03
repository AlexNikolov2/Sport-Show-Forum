import { createAction, props } from '@ngrx/store';

export const authSuccess = '[Auth] Auth Success';
export const authCheckFail = '[Auth] Auth Check Fail';
export const logoutUser = '[Auth] Logout User';

export const auth_success = createAction(authSuccess, props<authSuccess>());
export const auth_check_fail = createAction(authCheckFail);
export const logout_user = createAction(logoutUser);

export type authStart = { email: string, password: string };
export type authSuccess = { email: string, _id: string };