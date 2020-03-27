import { ADD_REF, SET_ACTIVE } from '../actions/types';

const initialState = {
	refs: [],
	active: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_REF:
			return {
				...state,
				refs: [payload, ...state.refs],
			};
		case SET_ACTIVE:
			return {
				...state,
				active: payload,
			};
		default:
			return state;
	}
};
