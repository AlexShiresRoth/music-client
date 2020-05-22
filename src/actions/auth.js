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

export const createUser = ({ name, email, password, password2, adminCode }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const data = JSON.stringify({ name, email, password, password2, adminCode });
	try {
		const res = await axios.post('/users', data, config);

		dispatch({
			type: CREATE_USER,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (error) {
		console.error(error);
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const logoutUser = () => async (dispatch) => {
	dispatch({
		type: CLEAR_USER,
	});
};
