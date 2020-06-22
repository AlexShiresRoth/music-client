import { AUTHENTICATE, LOAD_USER, CREATE_USER, AUTH_ERROR, LOGOUT } from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null,
	loading: true,
	errors: [],
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case AUTHENTICATE:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case LOAD_USER:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};
		case CREATE_USER:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};

		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				token: null,
				loading: false,
				user: null,
			};
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				token: null,
				loading: false,
				errors: payload,
			};
		default:
			return state;
	}
};
