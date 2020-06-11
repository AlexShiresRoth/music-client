import React from 'react';
import { connect } from 'react-redux';
import style from './Alert.module.scss';
const Alert = ({ alert }) => {
	return alert.length > 0 ? (
		<div className={style.container}>
			{alert.map((item) => {
				return item.msg ? (
					<div className={item.alertType === 'danger' ? style.alert_danger : style.alert_success}>
						<p>{item.msg}</p>
					</div>
				) : null;
			})}
		</div>
	) : null;
};

Alert.propTypes = {};

const mapStateToProps = (state) => {
	return {
		alert: state.alert,
	};
};

export default connect(mapStateToProps, null)(Alert);
