import { SET_MODAL } from './types';

export const setModalState = (val) => async (dispatch) => {
	dispatch({
		type: SET_MODAL,
		payload: val,
	});
};
