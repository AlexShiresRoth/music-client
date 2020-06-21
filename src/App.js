import React, { useEffect } from 'react';
import './css/main.css';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import store from './store';
import Home from './components/pages/Home';
import setAuthToken from './reusable/setAuthToken';
import Store from './components/pages/Store';
import Login from './components/pages/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import Signup from './components/pages/Signup';
import StoreUpload from './components/pages/StoreUpload';
import CheckoutPage from './components/pages/CheckoutPage';
import CheckoutConfirmPage from './components/pages/CheckoutConfirmPage';
import EditStoreItem from './components/pages/EditStoreItem';
import AccountPage from './components/pages/AccountPage';
import ViewOrdersPage from './components/pages/ViewOrdersPage';
import ForgotPassword from './components/pages/ForgotPassword';
import PasswordResetPage from './components/pages/PasswordResetPage';

const App = () => {
	const client = new ApolloClient({
		link: new PrismicLink({
			uri: 'https://gerrymckeveny.prismic.io/graphql',
			repositoryName: 'gerrymckeveny',
		}),
		cache: new InMemoryCache(),
	});

	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			setAuthToken(localStorage.token);
			store.dispatch(loadUser());
		}
	}, [token]);

	return (
		<Provider store={store}>
			<ApolloProvider client={client}>
				<HashRouter>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/store" component={Store} />
						<Route path="/store/login" component={Login} />
						<Route exact path="/store/signup" component={Signup} />
						<Route exact path="/store/forgotpassword" component={ForgotPassword} />
						<Route exact path="/store/passwordreset/:id" component={PasswordResetPage} />
						<PrivateRoute exact path="/store/additem" component={StoreUpload} />
						<PrivateRoute exact path="/store/edit/:id" component={EditStoreItem} />
						<PrivateRoute exact path="/store/checkout" component={CheckoutPage} />
						<PrivateRoute exact path="/store/checkout/payment/:id" component={CheckoutConfirmPage} />
						<PrivateRoute exact path="/store/account" component={AccountPage} />
						<PrivateRoute exact path="/store/account/vieworders" component={ViewOrdersPage} />
					</Switch>
				</HashRouter>
			</ApolloProvider>
		</Provider>
	);
};

export default App;
