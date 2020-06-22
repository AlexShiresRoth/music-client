import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import ContactModal from '../contact/ContactModal';

const ContactPage = (props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 300);
	}, []);

	return (
		<Layout>
			<ContactModal />
		</Layout>
	);
};

export default ContactPage;
