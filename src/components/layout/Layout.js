import React from 'react';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import Alert from '../alerts/Alert';
import ContactModal from '../contact/ContactModal';
import EmailSignup from '../EmailSignup.js/EmailSignup';

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
			<EmailSignup />
			<Footer />
		</main>
	);
};

export default Layout;
