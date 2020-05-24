import { LOAD_ITEMS } from '../actions/types';

const initialState = {
	items: null,
	loading: true,
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
		default:
			return state;
	}
};
