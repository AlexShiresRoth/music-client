import axios from 'axios';
import { LOAD_ITEMS, UPLOAD_TO_STORE, UPLOAD_ERROR } from './types';

export const loadItems = () => async (dispatch) => {
	try {
		const res = await axios.get('/shop');
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

	const res = await axios.post('/shop/additem/', formData, config);
	console.log(res);

	try {
		dispatch({
			type: UPLOAD_TO_STORE,
			payload: res.data,
		});

		history.push('/store');
	} catch (error) {
		console.error('idk why this isnt proxying' + error.response);
		dispatch({
			type: UPLOAD_ERROR,
		});
	}
};
