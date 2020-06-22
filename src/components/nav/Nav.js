import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import navStyle from './Nav.module.scss';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { setActive } from '../../actions/refs';
import { AuthorizedLinks } from './AuthorizedLinks';
import { AdminLinks } from './AdminLinks';
import { AuthLinks } from './AuthLinks';
import { NavLinksComponent } from './NavLinksComponent';
import Cart from './cart/Cart';
import { cancelIntent } from '../../actions/store';

const Nav = ({
	refs: { active, refs, currentSection },
	setActive,
	history,
	auth: { isAuthenticated, user, loading },
	logoutUser,
	store: { purchaseItem },
	cancelIntent,
}) => {
	const [page, setPage] = useState('');

	const scrollToSection = (refs) => {
		const selectedSection = refs[0];

		const handleScroll = (ref) => {
			window.scrollTo({
				top: ref.current.offsetTop,
				left: 0,
				behavior: 'smooth',
			});
		};

		switch (true) {
			case selectedSection.current.id === 'bio':
				handleScroll(selectedSection);
				setNavState(!navState);
				break;
			case selectedSection.current.id === 'home':
				handleScroll(selectedSection);
				setNavState(!navState);
				break;
			case selectedSection.current.id === 'gigs':
				handleScroll(selectedSection);
				setNavState(!navState);
				break;
			case selectedSection.current.id === 'music':
				handleScroll(selectedSection);
				setNavState(!navState);
				break;
			default:
				return;
		}
	};

	const handleAppropriateNavLinks = () => {
		return page !== '/' ? (
			!loading && isAuthenticated && user !== null ? (
				user.role === 'admin' ? (
					<>
						<AdminLinks
							logoutUser={logoutUser}
							history={history}
							cancelIntent={cancelIntent}
							purchaseItem={purchaseItem}
						/>
						<Cart />
					</>
				) : (
					<>
						<AuthorizedLinks
							logoutUser={logoutUser}
							history={history}
							cancelIntent={cancelIntent}
							purchaseItem={purchaseItem}
						/>
						<Cart />
					</>
				)
			) : (
				<>
					<AuthLinks scrollToSection={scrollToSection} refs={refs} currentSection={currentSection} />
					<Cart />
				</>
			)
		) : (
			<NavLinksComponent scrollToSection={scrollToSection} refs={refs} currentSection={currentSection} />
		);
	};

	const [navState, setNavState] = useState(false);

	const burgerMenu = (
		<svg viewBox="0 0 100 100" className={navStyle.menu} onClick={() => setNavState(!navState)}>
			<g>
				<path
					d="M 0 50 L100 50 Z"
					strokeWidth="3px"
					stroke="#fff"
					className={navState ? navStyle.rotated : ''}
				/>
				<path
					d="M 0, 30 L100, 30 Z"
					strokeWidth="3px"
					stroke="#fff"
					className={navState ? navStyle.rotated : ''}
				/>
				<path
					d="M 0, 70 L100, 70 Z"
					strokeWidth="3px"
					stroke="#fff"
					className={navState ? navStyle.rotated : ''}
				/>
			</g>
		</svg>
	);

	useEffect(() => {
		setPage(history.location.pathname);
		setActive(history.location.pathname !== '/');
	}, [history.location.pathname, setActive]);

	return (
		<nav
			className={
				active
					? page !== '/'
						? `${navStyle.nav_reg} ${navStyle.active_nav}`
						: `${navStyle.nav} ${navStyle.active_nav}`
					: `${navStyle.nav}`
			}
		>
			<div className={navStyle.nav_title}>
				<h2>gerry mckeveny</h2>
			</div>
			<div className={navStyle.nav_inner}>{handleAppropriateNavLinks()}</div>
			{/* Mobile Navigation */}
			<div className={navStyle.mobile_nav}>{burgerMenu}</div>
			<div className={navState ? navStyle.side_menu : `${navStyle.side_menu} ${navStyle.side_menu_hide}`}>
				<div className={navStyle.side_menu_container}>{handleAppropriateNavLinks()}</div>
				<div className={navStyle.tap_to_close} onClick={(e) => setNavState(!navState)}></div>
			</div>{' '}
		</nav>
	);
};

Nav.propTypes = {
	refs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		refs: state.refs,
		auth: state.auth,
		contact: state.contact,
		store: state.store,
	};
};

export default connect(mapStateToProps, { logoutUser, setActive, cancelIntent })(withRouter(Nav));
