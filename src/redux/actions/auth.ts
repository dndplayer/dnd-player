import { AnyAction, Action } from 'redux';

export const types = {
	LOGIN: {
		REQUEST: 'LOGIN.REQUEST',
		SUCCESS: 'LOGIN.SUCCESS',
		FAILURE: 'LOGIN.FAILURE'
	},
	LOGOUT: {
		REQUEST: 'LOGOUT.REQUEST',
		SUCCESS: 'LOGOUT.SUCCESS',
		FAILURE: 'LOGOUT.FAILURE'
	},
	DM: {
		SET: 'AUTH.DM.SET'
	}
};

export interface SetIsDmAction extends Action {
	value: boolean;
}

export const login = (username: string, password: string): AnyAction => ({
	type: types.LOGIN.REQUEST,
	username,
	password
});

export const loginSuccess = user => ({
	type: types.LOGIN.SUCCESS,
	user
});

export const loginFailure = error => ({
	type: types.LOGIN.FAILURE,
	error
});

export const logout = () => ({
	type: types.LOGOUT.REQUEST
});

export const logoutSuccess = () => ({
	type: types.LOGOUT.SUCCESS
});

export const logoutFailure = error => ({
	type: types.LOGOUT.FAILURE,
	error
});

export const setIsDm = (val: boolean): SetIsDmAction => ({
	type: types.DM.SET,
	value: val
});
