import React from 'react';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import Alert from '../alerts/Alert';
import ContactModal from '../contact/ContactModal';

const Layout = ({ children }) => {
	const layoutStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	};

	return (
		<main style={{ ...layoutStyle }}>
			<ContactModal />
			<Alert />
			<Nav />
			{children}
			<Footer />
		</main>
	);
};

export default Layout;
