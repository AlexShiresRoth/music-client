import { AUTHENTICATE, CLEAR_USER, LOAD_USER, CREATE_USER } from '../actions/types';

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
				isAuthenticated: true,
				loading: false,
			};
		case LOAD_USER:
			return {
				...state,
				user: payload,
				isAuthenticated: true,
				loading: false,
			};
		case CREATE_USER:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				isAuthenticated: true,
				user: payload,
				loading: false,
			};
		case CLEAR_USER:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				token: null,
				loading: false,
				user: null,
			};
		default:
			return state;
	}
};
