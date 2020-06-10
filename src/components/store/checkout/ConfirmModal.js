import React from 'react';
import PropTypes from 'prop-types';
import style from './ConfirmModal.module.scss';
const ConfirmModal = ({ setModalState, modalState, total, handleSubmit }) => {
	return modalState ? (
		<div className={style.modal_container}>
			<div className={style.modal}>
				<div className={style.close_btn}>
					<button onClick={(e) => setModalState(false)}>X</button>
				</div>
				<div className={style.message}>
					<h2>
						Pay<span> ${total}.00</span>?
					</h2>
				</div>
				<button onClick={(e) => handleSubmit(e)}>Confirm Payment</button>
			</div>
		</div>
	) : null;
};

ConfirmModal.propTypes = {
	setModalState: PropTypes.func.isRequired,
	modalState: PropTypes.bool.isRequired,
	total: PropTypes.number.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default ConfirmModal;
