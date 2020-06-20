import Axios from 'axios';
import {
	LOAD_ORDERS,
	AUTH_ERROR,
	CHANGE_PASSWORD,
	ACCOUNT_ERROR,
	DELETE_ACCOUNT,
	CLEAR_USER,
	CHANGE_EMAIL,
	RESET_PASSWORD,
	LOAD_PASSWORD_RESET,
} from './types';
import { setAlert } from './alert';
import { api } from '../reusable/api';

const config = {
	accept: 'application/json',
	headers: { 'Content-Type': 'application/json' },
};
export const loadOrderHistory = () => async (dispatch) => {
	try {
		const res = await Axios.get(api + '/users/orders');

		dispatch({
			type: LOAD_ORDERS,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: AUTH_ERROR,
			payload: error.response.data,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const changePassword = (formData) => async (dispatch) => {
	try {
		const res = await Axios.put(api + '/users/changepassword', formData, config);
		console.log(res.data);
		dispatch({
			type: CHANGE_PASSWORD,
			payload: res.data,
		});
		dispatch(setAlert('Password has been changed', 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: ACCOUNT_ERROR,
			payload: error.response.data,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const changeEmail = (formData) => async (dispatch) => {
	try {
		const res = await Axios.put(api + '/users/changeemail', formData, config);
		console.log(res.data);
		dispatch({
			type: CHANGE_EMAIL,
			payload: res.data,
		});
		dispatch(setAlert('Email has been changed', 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: ACCOUNT_ERROR,
			payload: error.response.data,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const deleteAccount = (formData, history) => async (dispatch) => {
	try {
		const res = await Axios.put(api + '/users/deleteaccount', formData, config);

		dispatch({
			type: DELETE_ACCOUNT,
			payload: res.data,
		});

		dispatch({
			type: CLEAR_USER,
		});

		dispatch(setAlert('Account has been deleted :(', 'success'));

		history.push('/store');
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: ACCOUNT_ERROR,
			payload: error.response.data,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const sendPasswordResetLink = (formData) => async (dispatch) => {
	try {
		await Axios.post(api + '/users/resetpassword', formData, config);

		dispatch({
			type: RESET_PASSWORD,
		});

		dispatch(
			setAlert(
				'A link has been emailed to the account associated with this email, you have 10 minutes to reset or the link will expire!',
				'success'
			)
		);
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: ACCOUNT_ERROR,
			payload: error.response.data,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const loadPasswordResetObject = (id) => async (dispatch) => {
	try {
		const res = await Axios.get(api + `/users/passwordreset/${id}`);

		dispatch({
			type: LOAD_PASSWORD_RESET,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const sendPasswordResetRequest = (formData, history) => async (dispatch) => {
	try {
		await Axios.put(api + '/users/resetforgottenpassword', formData, config);
		dispatch({
			type: RESET_PASSWORD,
		});
		dispatch(setAlert('Password reset was successful', 'success'));
		history.push('/store/login');
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: ACCOUNT_ERROR,
			payload: error.response.data,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};
