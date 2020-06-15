import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import modalStyle from './ContactModal.module.scss';
import { MdClose } from 'react-icons/md';
import { connect } from 'react-redux';
import { setModalState } from '../../actions/contact';

const ContactModal = ({ contact: { modalState }, setModalState }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const { name, email, subject, message } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const formSubmit = (e) => {
		e.preventDefault();
	};
	useEffect(() => {
		setFormData({
			name: '',
			email: '',
			subject: '',
			message: '',
		});
	}, [modalState]);
	return (
		<>
			{modalState ? (
				<div className={modalStyle.contact_modal}>
					<div className={modalStyle.form_container}>
						<div className={modalStyle.btn_container} onClick={(e) => setModalState(!modalState)}>
							<MdClose />
						</div>
						<div className={modalStyle.grid}>
							<div className={modalStyle.text_box}>
								<h2>Get in contact.</h2>
							</div>
							<form className={modalStyle.form} onSubmit={(e) => formSubmit(e)}>
								<div className={modalStyle.input_row}>
									<label>Name</label>
									<input type="text" name="name" value={name} onChange={(e) => onChange(e)} />
								</div>
								<div className={modalStyle.input_row}>
									<label>Email</label>
									<input type="email" name="email" value={email} onChange={(e) => onChange(e)} />
								</div>
								<div className={modalStyle.input_row}>
									<label>Subject</label>
									<input type="text" name="subject" value={subject} onChange={(e) => onChange(e)} />
								</div>
								<div className={modalStyle.input_row}>
									<label>Message</label>
									<textarea value={message} name="message" onChange={(e) => onChange(e)}></textarea>
								</div>
								<div className={modalStyle.input_row}>
									<button onSubmit={(e) => formSubmit(e)}>Send</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			) : (
				<div className={modalStyle.hidden}></div>
			)}
		</>
	);
};

ContactModal.propTypes = {
	modalState: PropTypes.bool.isRequired,
	setModalState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		contact: state.contact,
	};
};

export default connect(mapStateToProps, { setModalState })(ContactModal);
