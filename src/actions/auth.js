import { AUTHENTICATE, AUTH_ERROR, LOAD_USER, CREATE_USER, CLEAR_CART, LOGOUT } from './types';

import { setAlert } from './alert';
import api from '../reusable/api';
import setAuthToken from '../reusable/setAuthToken';

export const loadUser = () => async (dispatch) => {
	const token = localStorage.getItem('token');

	setAuthToken(token);

	try {
		const res = await api.get('/auth/');

		console.log('this is the user', res.data);
		dispatch({
			type: LOAD_USER,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

//login the user
export const authenticateUser = (data, history) => async (dispatch) => {
	try {
		const res = await api.post('/auth', data);

		dispatch({
			type: AUTHENTICATE,
			payload: res.data,
		});

		dispatch(loadUser());

		dispatch(setAlert('Welcome back', 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		dispatch({
			type: AUTH_ERROR,
			payload: error.response.data.msg,
		});
		if (errors) {
			console.log(errors[0].msg[0].msg, 'HELP');
			errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
		} else {
			dispatch(setAlert(error.response.data.msg, 'danger'));
		}
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const createUser = (data, history) => async (dispatch) => {
	try {
		const res = await api.post('/users', data);

		console.log('user created', res.data);
		dispatch({
			type: CREATE_USER,
			payload: res.data,
		});

		dispatch(loadUser());

		dispatch(setAlert('You have successfully created an account', 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		if (errors) {
			errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
		} else {
			dispatch({
				type: AUTH_ERROR,
				payload: error.response.data.msg,
			});
			dispatch(setAlert(error.response.data.msg, 'danger'));
		}
	}
};

export const logoutUser = (history) => async (dispatch) => {
	try {
		dispatch({
			type: LOGOUT,
		});
		dispatch({
			type: CLEAR_CART,
		});

		dispatch(setAlert('You have been logged out', 'success'));

		history.push('/store');
	} catch (error) {
		console.error(error);
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach((err) => dispatch(setAlert(err.msg[0].msg, 'danger')));
		} else {
			dispatch({
				type: AUTH_ERROR,
				payload: error.response.data.msg,
			});
			dispatch(setAlert(error.response.data.msg, 'danger'));
		}
	}
};
