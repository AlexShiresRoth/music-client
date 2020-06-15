import React, { useState, useEffect } from 'react';
import style from './UploadForm.module.scss';
import { connect } from 'react-redux';
import { getItemToEdit, submitEditedItem } from '../../../actions/store';
import { withRouter, useParams } from 'react-router-dom';

const EditForm = ({ submitEditedItem, history, getItemToEdit, store: { editItem, loading } }) => {
	const params = useParams();

	useEffect(() => {
		const id = params.id;
		getItemToEdit(id);
	}, [params.id, getItemToEdit]);

	const [data, setdata] = useState({
		name: '',
		description: '',
		amount: 0,
		quantity: 0,
		image: '',
		id: '',
	});

	const widget = window.cloudinary.createUploadWidget(
		{
			cloudName: 'snackmanproductions',
			uploadPreset: 'store_upload_max',
			folder: 'gerry-m',
		},
		(error, result) => {
			if (!error && result && result.event === 'success') {
				console.log('Done! Here is the image info: ', result.info.secure_url);
				setdata({ ...data, image: result.info.secure_url });
				return result.info;
			}
		}
	);

	const { name, description, amount, quantity, image } = data;

	const onChange = (e) => setdata({ ...data, [e.target.name]: e.target.value });

	const formSubmit = (e) => {
		e.preventDefault();
		submitEditedItem(data, history);
		console.log(data, history);
	};

	const handleWidgetVisibility = (e) => {
		e.preventDefault();
		widget.open();
	};

	useEffect(() => {
		if (editItem) {
			setdata({
				name: editItem.name,
				description: editItem.description,
				quantity: editItem.quantity,
				amount: editItem.amount,
				image: editItem.image,
				id: editItem._id,
			});
		}
	}, [editItem]);

	return !loading && editItem ? (
		<form className={style.form} onSubmit={(e) => formSubmit(e)}>
			<div className={style.input_col}>
				<label>Add an image for the item.</label>
				<input
					type="text"
					name="image"
					placeholder="Image Url"
					value={image}
					onChange={(e) => onChange(e)}
					required={true}
				></input>
				<button onClick={(e) => handleWidgetVisibility(e)}>Upload Image</button>
			</div>
			<div className={style.input_col}>
				<label>Name the item</label>
				<input
					type="text"
					name="name"
					placeholder="Enter Name"
					value={name}
					onChange={(e) => onChange(e)}
					required={true}
				></input>
			</div>
			<div className={style.input_col}>
				<label>Add a description</label>
				<input
					type="text"
					name="description"
					placeholder="Enter a Description"
					value={description}
					onChange={(e) => onChange(e)}
					required={true}
				></input>
			</div>
			<div className={style.input_col}>
				<label>Add a price</label>
				<input
					type="number"
					name="amount"
					placeholder="Enter a price"
					value={amount}
					onChange={(e) => onChange(e)}
					required={true}
				></input>
			</div>
			<div className={style.input_col}>
				<label>How many are available?</label>
				<input
					type="number"
					name="quantity"
					placeholder="Enter an amount of available stock"
					value={quantity}
					onChange={(e) => onChange(e)}
					required={true}
				></input>
			</div>
			<div className={style.input_col}>
				<button onClick={(e) => formSubmit(e)}>Submit Edits</button>
			</div>
		</form>
	) : (
		<p>Loading...</p>
	);
};
const mapStateToProps = (state) => {
	return {
		store: state.store,
	};
};
export default connect(mapStateToProps, { submitEditedItem, getItemToEdit })(withRouter(EditForm));
