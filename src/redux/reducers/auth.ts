import { types, AuthActions } from '../actions/auth';

interface AuthState {
	loading: boolean;
	loggedIn: boolean;
	user?: firebase.User;
	loginError?: any;
	dm: boolean;
	canBeDm: boolean;
}

const initialState: AuthState = {
	loading: false,
	loggedIn: false,
	user: null,
	loginError: null,
	dm: false,
	canBeDm: false
};

export default function authReducer(
	state: AuthState = initialState,
	action: AuthActions
): AuthState {
	switch (action.type) {
		case types.LOGIN.REQUEST:
		case types.LOGOUT.REQUEST:
			return {
				...state,
				loading: true
			};
		case types.LOGIN.SUCCESS:
			return {
				...state,
				loading: false,
				loggedIn: true,
				user: (action as any).user,
				loginError: null
			};
		case types.LOGIN.FAILURE:
			return {
				...state,
				loading: false,
				loginError: (action as any).error
			};
		case types.LOGOUT.SUCCESS:
			return initialState;
		case types.LOGOUT.FAILURE:
			return {
				...state,
				loading: false
			};
		case types.CAN_BE_DM.SET:
			return {
				...state,
				canBeDm: action.value,
				dm: action.value
			};
		case types.DM.SET:
			return {
				...state,
				dm: action.value
			};
		default:
			return state;
	}
}
