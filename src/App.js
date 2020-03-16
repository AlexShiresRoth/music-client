import React from 'react';
import './css/main.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Landing from './components/landing/Landing.js';
const App = () => {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/" component={Landing} />
			</Switch>
		</HashRouter>
	);
};

export default App;
