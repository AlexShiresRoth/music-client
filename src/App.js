import React from 'react';
import './css/main.css';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './components/layout/Home';
const App = () => {
	const client = new ApolloClient({
		link: new PrismicLink({
			uri: 'https://gerrymckeveny.prismic.io/graphql',
			repositoryName: 'gerrymckeveny',
		}),
		cache: new InMemoryCache(),
	});
	return (
		<ApolloProvider client={client}>
			<HashRouter>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</HashRouter>
		</ApolloProvider>
	);
};

export default App;
