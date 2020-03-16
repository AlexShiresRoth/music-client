import React from 'react';
import './css/main.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/landing/Landing.js';
const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Landing} />
			</Switch>
		</Router>
	);
};

export default App;
