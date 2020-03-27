import { ADD_REF, SET_ACTIVE, SET_CURRENT } from '../actions/types';

const initialState = {
	refs: [],
	active: false,
	currentSection: '',
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
		case SET_CURRENT:
			return {
				...state,
				currentSection: payload,
			};
		default:
			return state;
	}
};
