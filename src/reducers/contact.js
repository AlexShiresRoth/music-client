import { SET_MODAL } from '../actions/types';

const initialState = {
	modalState: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_MODAL:
			return {
				...state,
				modalState: payload,
			};
		default:
			return state;
	}
};
