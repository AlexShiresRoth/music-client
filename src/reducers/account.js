import { LOAD_ORDERS } from '../actions/types';

const initialState = {
	orderHistory: [],
	loading: true,
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
		default:
			return state;
	}
};
