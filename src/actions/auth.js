import axios from 'axios';
import { AUTHENTICATE, USER_LOADED, AUTH_ERROR, LOAD_USER, CREATE_USER, CLEAR_USER } from './types';
import setAuthToken from '../reusable/setAuthToken';

export const loadUser = () => async (dispatch) => {
	console.log(localStorage);
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/auth');

		dispatch({
			type: LOAD_USER,
			payload: res.data,
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: AUTH_ERROR,
		});
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
		const res = await axios.post('/auth', formData, config);

		dispatch({
			type: AUTHENTICATE,
			payload: res.data,
		});

		history.push('/store');
	} catch (error) {
		console.error(error);
		dispatch({
			type: AUTH_ERROR,
		});
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
		const res = await axios.post('/users', body, config);

		dispatch({
			type: CREATE_USER,
			payload: res.data,
		});
		history.push('/store');

		dispatch(loadUser());
	} catch (error) {
		console.error(error);
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const logoutUser = (history) => async (dispatch) => {
	dispatch({
		type: CLEAR_USER,
	});
};
