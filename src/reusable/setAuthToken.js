import api from '../reusable/api';

const setAuthToken = (token) => {
	if (token) {
		console.log('is this fucking token here?', token);
		api.defaults.headers.common['x-auth-token'] = token;
		localStorage.setItem('token', token);
	} else {
		delete api.defaults.headers.common['x-auth-token'];
		localStorage.removeItem('token');
	}
};

export default setAuthToken;
