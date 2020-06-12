import axios from 'axios';
import { AUTHENTICATE, AUTH_ERROR, LOAD_USER, CREATE_USER, CLEAR_USER, CLEAR_CART } from './types';
import setAuthToken from '../reusable/setAuthToken';
import { setAlert } from './alert';
import { api } from '../reusable/api';

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get(api + '/auth');

		dispatch({
			type: LOAD_USER,
			payload: res.data,
		});
	} catch (error) {
		console.error(error);
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach((err) => dispatch(setAlert(err.msg[0].msg, 'danger')));
		}
		dispatch({
			type: AUTH_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const authenticateUser = (data, history) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const formData = JSON.stringify({ ...data });

	try {
		const res = await axios.post(api + '/auth', formData, config);

		dispatch({
			type: AUTHENTICATE,
			payload: res.data,
		});

		dispatch(setAlert('Welcome back', 'success'));

		history.push('/store');
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			console.log(errors[0].msg[0].msg, 'HELP');
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

export const createUser = (data, history) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ ...data });
	try {
		const res = await axios.post(api + '/users', body, config);

		dispatch({
			type: CREATE_USER,
			payload: res.data,
		});

		dispatch(setAlert('You have successfully created an account', 'success'));

		history.push('/store');

		dispatch(loadUser());
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
			type: CLEAR_USER,
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
