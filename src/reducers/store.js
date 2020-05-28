import { LOAD_ITEMS, UPLOAD_TO_STORE, UPLOAD_ERROR } from '../actions/types';

const initialState = {
	items: null,
	loading: true,
	upload: null,
	errors: [],
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOAD_ITEMS:
			return {
				...state,
				items: payload,
				loading: false,
			};
		case UPLOAD_TO_STORE:
			return {
				...state,
				upload: payload,
				loading: false,
			};
		case UPLOAD_ERROR:
			return {
				...state,
				errors: payload,
				loading: false,
			};
		default:
			return state;
	}
};
