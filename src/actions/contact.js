import { SET_MODAL, SEND_EMAIL, EMAIL_ERROR } from './types';
import api from '../reusable/api';
import { setAlert } from './alert';

export const setModalState = (val) => async (dispatch) => {
	dispatch({
		type: SET_MODAL,
		payload: val,
	});
};

export const sendEmail = (formData) => async (dispatch) => {
	try {
		const res = await api.post('/contact/sendemail', formData);

		dispatch({
			type: SEND_EMAIL,
			payload: res.data,
		});

		dispatch(setAlert(res.data.msg, 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			dispatch({
				type: EMAIL_ERROR,
				payload: errors,
			});
			errors.map((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: EMAIL_ERROR,
			payload: error.response.data.msg,
		});
		setAlert(error.response.data.msg, 'danger');
	}
};

export const sendConfirmationEmail = (formData) => async (dispatch) => {
	try {
		const res = await api.post('/contact/confirmemail', formData);

		dispatch({
			type: SEND_EMAIL,
			payload: res.data,
		});

		dispatch(setAlert(res.data.msg, 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			dispatch({
				type: EMAIL_ERROR,
				payload: errors,
			});
			errors.map((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: EMAIL_ERROR,
			payload: error.response.data.msg,
		});
		setAlert(error.response.data.msg, 'danger');
	}
};
