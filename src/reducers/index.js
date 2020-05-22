import { combineReducers } from 'redux';
import refs from './refs';
import auth from './auth';
export default combineReducers({
	refs,
	auth,
});
