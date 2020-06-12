import Axios from 'axios';
import { LOAD_ORDERS, AUTH_ERROR } from './types';
import { setAlert } from './alert';
import { api } from '../reusable/api';

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
