import { SET_MODAL, SEND_EMAIL, EMAIL_ERROR } from '../actions/types';

const initialState = {
	modalState: false,
	emailResult: null,
	loading: true,
	errors: [],
	status: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_MODAL:
			return {
				...state,
				modalState: payload,
			};
		case SEND_EMAIL:
			return {
				...state,
				loading: false,
				emailResult: payload,
				status: 'sent',
			};
		case EMAIL_ERROR:
			return {
				...state,
				loading: false,
				errors: payload,
				emailResult: null,
				status: 'error',
			};
		default:
			return state;
	}
};
