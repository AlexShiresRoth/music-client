import { LOAD_ITEMS, UPLOAD_TO_STORE, ADD_CART, STORE_ERROR } from '../actions/types';

const initialState = {
	items: null,
	loading: true,
	upload: null,
	errors: [],
	cart: [],
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOAD_ITEMS:
			return {
				...state,
				items: payload,
				loading: false,
			};
		case UPLOAD_TO_STORE:
			return {
				...state,
				upload: payload,
				loading: false,
			};
		case ADD_CART:
			//localStorage.setItem('cart', state.cart)
			return {
				...state,
				loading: false,
				cart: [...state.cart, payload],
			};
		case STORE_ERROR:
			return {
				...state,
				errors: [...state.errors, payload],
				loading: false,
			};

		default:
			return state;
	}
};
