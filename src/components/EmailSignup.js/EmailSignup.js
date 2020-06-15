import React from 'react';
import PropTypes from 'prop-types';
import style from './EmailSignup.module.scss';

const EmailSignup = (props) => {
	return (
		<section className={style.section}>
			<div className={style.heading}>
				<h3>gerry mckeveny</h3>
				<p>Signup for exclusive content</p>
			</div>
			<form>
				<input type="text" name="signup" placeholder="enter email" required={true} />
				<button>send</button>
			</form>
		</section>
	);
};

EmailSignup.propTypes = {};

export default EmailSignup;
