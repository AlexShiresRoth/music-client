import { combineReducers } from 'redux';
import refs from './refs';
import auth from './auth';
import store from './store';
import alert from './alert';
import contact from './contact';
import account from './account';
export default combineReducers({
	refs,
	auth,
	store,
	alert,
	contact,
	account,
});
