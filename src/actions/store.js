import axios from 'axios';
import { LOAD_ITEMS } from './types';

export const loadItems = () => async (dispatch) => {
	try {
		const res = await axios.get('/store');
		dispatch({
			type: LOAD_ITEMS,
			payload: res.data,
		});
	} catch (error) {
		console.error(error);
	}
};
