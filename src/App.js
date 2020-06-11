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

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	const initState = store.getState();
	console.log(initState.auth);

	useEffect(() => {
		store.dispatch(loadUser);
	}, []);

	const client = new ApolloClient({
		link: new PrismicLink({
			uri: 'https://gerrymckeveny.prismic.io/graphql',
			repositoryName: 'gerrymckeveny',
		}),
		cache: new InMemoryCache(),
	});

	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<HashRouter>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/store" component={Store} />
						<Route path="/store/login" component={Login} />
						<Route exact path="/store/signup" component={Signup} />
						<PrivateRoute exact path="/store/additem" component={StoreUpload} />
						<PrivateRoute exact path="/store/edit/:id" component={EditStoreItem} />
						<PrivateRoute exact path="/store/checkout" component={CheckoutPage} />
						<PrivateRoute exact path="/store/checkout/payment/:id" component={CheckoutConfirmPage} />
					</Switch>
				</HashRouter>
			</Provider>
		</ApolloProvider>
	);
};

export default App;
