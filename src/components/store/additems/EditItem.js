import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../login/Auth';
import style from './ItemUpload.module.scss';
import { connect } from 'react-redux';
import UploadForm from './UploadForm';
import { withRouter } from 'react-router-dom';
import EditForm from './EditForm';

const EditItem = ({ auth: { isAuthenticated, user, loading } }) => {
	return !loading && user !== null ? (
		isAuthenticated && user.role === 'admin' ? (
			<Auth>
				<div className={style.container}>
					<div className={style.grunge_overlay}></div>
					<div className={style.heading}>
						<h2>Edit Item</h2>
					</div>
					<EditForm />
				</div>
			</Auth>
		) : (
			<Auth>
				<p>You are not authorized to be here!!!!! GET OUT!!!!!</p>
			</Auth>
		)
	) : (
		<Auth>
			<p>You are not authorized to be here!!!!! GET OUT!!!!!</p>
		</Auth>
	);
};

EditItem.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(withRouter(EditItem));
