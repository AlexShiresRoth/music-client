import api from '../reusable/api';
import {
	LOAD_ITEMS,
	UPLOAD_TO_STORE,
	ADD_CART,
	STORE_ERROR,
	REMOVE_FROM_CART,
	UPDATE_TOTAL,
	UPDATE_CART,
	ADD_PURCHASE,
	LOAD_ITEM,
	RETRIEVE_INTENT,
	CANCEL_INTENT,
	PAYMENT_SUCCESS,
	GET_ITEM,
	CLEAR_CART,
	SEARCH_STORE,
} from './types';
import { setAlert } from './alert';

export const loadItems = () => async (dispatch) => {
	try {
		const res = await api.get(`/shop`);
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
		const res = await api.post('/shop/additem/', formData, config);

		dispatch({
			type: UPLOAD_TO_STORE,
			payload: res.data,
		});

		dispatch({
			type: CLEAR_CART,
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

export const removeFromCart = (item) => async (dispatch) => {
	try {
		dispatch({
			type: REMOVE_FROM_CART,
			payload: item,
		});
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
		});
		dispatch(setAlert('Could not remove item from cart, please retry', 'danger'));
	}
};

export const updateCart = (itemData) => async (dispatch) => {
	try {
		dispatch({
			type: UPDATE_CART,
			payload: itemData,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: STORE_ERROR,
		});
		dispatch(setAlert('Something went wrong updating your item', 'danger'));
	}
};

export const addPurchaseItem = (item, history) => async (dispatch) => {
	const config = {
		accept: 'application/json',
		headers: { 'Content-Type': 'application/json' },
	};

	const formData = JSON.stringify({ ...item });
	try {
		const res = await api.post('/checkout', formData, config);

		dispatch({
			type: ADD_PURCHASE,
			payload: res.data,
		});

		history.push(`/store/checkout/payment/${res.data._id}`);
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

export const getItemToEdit = (id) => async (dispatch) => {
	try {
		const res = await api.get(`/shop/edit/${id}`);
		dispatch({
			type: GET_ITEM,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const submitEditedItem = (data, history) => async (dispatch) => {
	const config = {
		accept: 'application/json',
		headers: { 'Content-Type': 'application/json' },
	};

	const formData = JSON.stringify({ ...data });

	try {
		const res = await api.put('/shop/edititem/', formData, config);
		dispatch({
			type: UPLOAD_TO_STORE,
			payload: res.data,
		});

		dispatch({
			type: CLEAR_CART,
		});

		dispatch(setAlert('Edited item in the store.', 'success'));

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

export const updateQuantity = (quantity, id) => async (dispatch) => {
	const config = {
		accept: 'application/json',
		headers: { 'Content-Type': 'application/json' },
	};

	const formData = JSON.stringify({ quantity, id });
	try {
		const res = await api.put('/checkout/updatequantity', formData, config);
		dispatch({
			type: UPLOAD_TO_STORE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const updateTotal = (total) => async (dispatch) => {
	try {
		dispatch({
			type: UPDATE_TOTAL,
			payload: total,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: STORE_ERROR,
		});
		dispatch(setAlert('Something went wrong updating your item', 'danger'));
	}
};

export const loadItem = (id) => async (dispatch) => {
	try {
		const res = await api.get(`/checkout/${id}`);
		dispatch({
			type: LOAD_ITEM,
			payload: res.data,
		});
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

export const retrieveIntent = (id) => async (dispatch) => {
	try {
		const res = await api.get(`/checkout/retrieveintent/${id}`);
		dispatch({
			type: RETRIEVE_INTENT,
			payload: res.data,
		});
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

export const cancelIntent = (id, history) => async (dispatch) => {
	try {
		const res = await api.post(`/checkout/cancelintent/${id}`);

		dispatch({
			type: CANCEL_INTENT,
			payload: res.data,
		});

		dispatch(setAlert('Order canceled.', 'success'));

		history.goBack();
	} catch (error) {
		console.error(error.response.data);

		dispatch({
			type: STORE_ERROR,
			payload: error.response.data,
		});

		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const paymentSuccess = (history, purchaseItem) => async (dispatch) => {
	const config = {
		accept: 'application/json',
		headers: { 'Content-Type': 'application/json' },
	};

	const formData = JSON.stringify({ ...purchaseItem });

	try {
		await api.post('/checkout/paymentsuccess', formData, config);

		dispatch({
			type: PAYMENT_SUCCESS,
		});
		dispatch(
			setAlert('Thank you, your order has been submitted and a receipt has been emailed to you.', 'success')
		);
		history.push('/store');
	} catch (error) {
		console.log(error);
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const paymentError = (error) => async (dispatch) => {
	dispatch({
		type: STORE_ERROR,
		payload: error.response.data.msg,
	});
	dispatch(setAlert(error.response.data.msg, 'danger'));
};

export const searchStore = (formData) => async (dispatch) => {
	try {
		console.log(formData);
		const res = await api.post('/shop/search', formData);
		dispatch({
			type: SEARCH_STORE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};
