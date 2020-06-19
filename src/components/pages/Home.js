import React, { useEffect } from 'react';
import Landing from '../landing/Landing';
import Gigs from '../gigs/Gigs';
import Bio from '../bio/Bio';
import Music from '../music/Music';
import Layout from '../layout/Layout';
const Home = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);
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
