import {
	LOAD_ORDERS,
	CHANGE_PASSWORD,
	ACCOUNT_ERROR,
	DELETE_ACCOUNT,
	CHANGE_EMAIL,
	RESET_PASSWORD,
	LOAD_PASSWORD_RESET,
} from '../actions/types';

const initialState = {
	orderHistory: [],
	updateSuccess: false,
	emailUpdate: false,
	loading: true,
	errors: null,
	passwordObject: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case LOAD_ORDERS:
			return {
				...state,
				orderHistory: payload,
				loading: false,
			};
		case CHANGE_PASSWORD:
			return {
				...state,
				updateSuccess: true,
				loading: false,
			};
		case CHANGE_EMAIL:
			return {
				...state,
				emailUpdate: true,
				loading: false,
			};
		case ACCOUNT_ERROR:
			return {
				...state,
				updateSuccess: false,
				errors: payload,
				loading: false,
			};
		case RESET_PASSWORD:
			return {
				...state,
				loading: false,
			};
		case LOAD_PASSWORD_RESET:
			return {
				...state,
				passwordObject: payload,
				loading: false,
			};
		case DELETE_ACCOUNT:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};
