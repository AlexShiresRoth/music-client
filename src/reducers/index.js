import { combineReducers } from 'redux';
import refs from './refs';
import auth from './auth';
import store from './store';
export default combineReducers({
	refs,
	auth,
	store,
});
