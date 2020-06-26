import React, { useState, useEffect } from 'react';
import modalStyle from './ContactModal.module.scss';
import { connect } from 'react-redux';
import { FaSpotify } from 'react-icons/fa';
import { TiSocialTwitter, TiSocialInstagram, TiSocialFacebook } from 'react-icons/ti';
import { withRouter } from 'react-router-dom';
import { sendEmail, sendConfirmationEmail } from '../../actions/contact';
import { LoadingSpinner } from '../loader/LoadingSpinner';

const ContactModal = ({ sendConfirmationEmail, sendEmail, contact: { emailResult, status } }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const [loading, setLoading] = useState(false);

	const { name, email, subject, message } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const formSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		sendEmail(formData);
		sendConfirmationEmail(formData);
	};

	useEffect(() => {
		if (status === 'sent') {
			setLoading(false);
			setFormData({ name: '', email: '', subject: '', message: '' });
		}
		if (status === 'error') {
			setLoading(false);
		}

		return () => setLoading(false);
	}, [status]);

	return (
		<div className={modalStyle.contact_modal}>
			<div className={modalStyle.form_container}>
				<div className={modalStyle.grid}>
					<div className={modalStyle.text_box}>
						<h2>Get In Contact.</h2>
						<div className={modalStyle.social}>
							<a href="!#">
								<TiSocialFacebook />
							</a>
							<a href="!#">
								<TiSocialInstagram />
							</a>
							<a href="!#">
								<TiSocialTwitter />
							</a>
							<a href="!#">
								<FaSpotify />
							</a>
						</div>
					</div>
					<form className={modalStyle.form} onSubmit={(e) => formSubmit(e)}>
						<div className={modalStyle.input_row}>
							<label>Name</label>
							<input
								type="text"
								name="name"
								value={name}
								onChange={(e) => onChange(e)}
								placeholder="enter your name"
								required={true}
							/>
						</div>
						<div className={modalStyle.input_row}>
							<label>Email</label>
							<input
								type="email"
								name="email"
								value={email}
								onChange={(e) => onChange(e)}
								placeholder="enter your email"
								required={true}
							/>
						</div>
						<div className={modalStyle.input_row}>
							<label>Subject</label>
							<input
								type="text"
								name="subject"
								value={subject}
								onChange={(e) => onChange(e)}
								placeholder="enter message subject"
								required={true}
							/>
						</div>
						<div className={modalStyle.input_row}>
							<label>Message</label>
							<textarea
								value={message}
								name="message"
								onChange={(e) => onChange(e)}
								required={true}
								placeholder="enter your message"
							></textarea>
						</div>
						<div className={modalStyle.input_row}>
							{loading ? <LoadingSpinner /> : <button onSubmit={(e) => formSubmit(e)}>Send</button>}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		contact: state.contact,
	};
};

export default connect(mapStateToProps, { sendConfirmationEmail, sendEmail })(withRouter(ContactModal));
