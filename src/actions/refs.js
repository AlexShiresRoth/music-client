import { ADD_REF, SET_ACTIVE } from './types';

export const addRef = ref => async dispatch => {
	dispatch({
		type: ADD_REF,
		payload: ref,
	});
};

export const setActive = state => async dispatch => {
	dispatch({
		type: SET_ACTIVE,
		payload: state,
	});
};
