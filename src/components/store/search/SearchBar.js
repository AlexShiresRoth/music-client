import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './SearchBar.module.scss';
import { searchStore } from '../../../actions/store';
import { connect } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { LoadingSpinner } from '../../loader/LoadingSpinner';
const SearchBar = ({ searchStore, store: { items, loading, errors } }) => {
	const [formData, setFormData] = useState({
		search: '',
	});

	const { search } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		searchStore(formData);
	};

	const clearSearch = (e) => {
		e.preventDefault();
		setFormData({ search: '' });
		searchStore('');
	};

	return (
		<div className={style.container}>
			<form onSubmit={(e) => handleSearchSubmit(e)}>
				<input
					type="text"
					name="search"
					value={search}
					onChange={(e) => onChange(e)}
					placeholder="Search for items by category or name"
				/>
				<button onSubmit={(e) => handleSearchSubmit(e)}>
					<AiOutlineSearch />
				</button>
			</form>
			<button onClick={(e) => clearSearch(e)}>Clear Search</button>
		</div>
	);
};

SearchBar.propTypes = {
	searchStore: PropTypes.func,
};

const mapStateToProps = (state) => {
	console.log(state);

	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { searchStore })(SearchBar);
