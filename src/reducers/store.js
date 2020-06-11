import {
	LOAD_ITEMS,
	UPLOAD_TO_STORE,
	ADD_CART,
	STORE_ERROR,
	REMOVE_FROM_CART,
	UPDATE_TOTAL,
	CLEAR_CART,
	UPDATE_CART,
	ADD_PURCHASE,
	LOAD_ITEM,
	RETRIEVE_INTENT,
	CANCEL_INTENT,
	PAYMENT_SUCCESS,
	GET_ITEM,
} from '../actions/types';

const initialState = {
	items: null,
	loading: true,
	upload: null,
	errors: [],
	cart: [],
	total: null,
	purchaseItem: null,
	clientSecret: null,
	editItem: null,
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
		case GET_ITEM:
			return {
				...state,
				loading: false,
				editItem: payload,
			};
		case UPDATE_TOTAL:
			return {
				...state,
				loading: false,
				total: payload,
			};
		case CLEAR_CART:
			return {
				...state,
				loading: false,
				cart: [],
			};
		case ADD_CART:
			//localStorage.setItem('cart', state.cart)
			return {
				...state,
				loading: false,
				cart:
					state.cart.filter((item) => item._id === payload._id).length > 0
						? [...state.cart]
						: [...state.cart, payload],
				purchaseItem: null,
				clientSecret: null,
			};
		case UPDATE_CART:
			return {
				...state,
				loading: false,
				cart: state.cart.map((item) => (item._id === payload.id ? { ...item, total: payload.amount } : item)),
			};
		case ADD_PURCHASE:
			return {
				...state,
				loading: false,
				purchaseItem: payload,
			};
		case LOAD_ITEM:
			return {
				...state,
				loading: false,
				purchaseItem: payload,
			};
		case RETRIEVE_INTENT: {
			return {
				...state,
				loading: false,
				clientSecret: payload,
			};
		}
		case CANCEL_INTENT:
			return {
				...state,
				loading: false,
				clientSecret: null,
			};
		case PAYMENT_SUCCESS:
			return {
				...state,
				loading: false,
				clientSecret: null,
				purchaseItem: null,
				total: null,
				cart: [],
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				loading: false,
				cart: state.cart.filter((item) => item._id !== payload._id),
				total: null,
				purchaseItem: null,
				clientSecret: null,
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
