import { ADD_REF, SET_ACTIVE, SET_CURRENT } from './types';

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

export const setCurrent = section => async dispatch => {
	dispatch({
		type: SET_CURRENT,
		payload: section,
	});
};
