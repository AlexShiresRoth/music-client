import React from 'react';
import Landing from '../landing/Landing';
import Gigs from '../gigs/Gigs';
import Bio from '../bio/Bio';
import Music from '../music/Music';
import Layout from '../layout/Layout';
const Home = (props) => {
	return (
		<Layout>
			<Landing />
			<Gigs />
			<Music />
			<Bio />
		</Layout>
	);
};

export default Home;
