import React from 'react';
import PropTypes from 'prop-types';
import Landing from '../landing/Landing';
import Gigs from '../gigs/Gigs';
import Bio from '../bio/Bio';
import Footer from '../footer/Footer';
import Layout from './Layout';
const Home = props => {
	return (
		<Layout>
			<Landing />
			<Gigs />
			<Bio />
			<Footer />
		</Layout>
	);
};

Home.propTypes = {};

export default Home;
