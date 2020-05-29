import axios from 'axios';
import { LOAD_ITEMS, UPLOAD_TO_STORE, UPLOAD_ERROR, ADD_CART, STORE_ERROR } from './types';
import { setAlert } from './alert';
import { api } from '../components/reusable/api';

export const loadItems = () => async (dispatch) => {
	try {
		const res = await axios.get(`/shop`);
		dispatch({
			type: LOAD_ITEMS,
			payload: res.data,
		});
	} catch (error) {
		console.error(error);
	}
};

export const uploadToStore = (data, history) => async (dispatch) => {
	const config = {
		accept: 'application/json',
		headers: { 'Content-Type': 'application/json' },
	};

	const formData = JSON.stringify({ ...data });

	try {
		const res = await axios.post('/shop/additem/', formData, config);
		dispatch({
			type: UPLOAD_TO_STORE,
			payload: res.data,
		});
		dispatch(setAlert('Item added to the store.', 'success'));

		history.push('/store');
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const addToCart = (item) => async (dispatch) => {
	try {
		dispatch({
			type: ADD_CART,
			payload: item,
		});
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
		});
		dispatch(setAlert('Could not add item to cart, please retry', 'danger'));
	}
};
