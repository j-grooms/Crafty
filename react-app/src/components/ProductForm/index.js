import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { createProduct } from "../../store/product";

const ProductForm = ({ onClose }) => {
	const seller = useSelector((state) => state.session.user.id);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0.0);
	const [category, setCategory] = useState("Clothing");
	const [description, setDescription] = useState("");
	const [height, setHeight] = useState("");
	const [width, setWidth] = useState("");
	const [length, setLength] = useState("");
	const [heightUnits, setHeightUnits] = useState("in");
	const [widthUnits, setWidthUnits] = useState("in");
	const [lengthUnits, setLengthUnits] = useState("in");
	const [weight, setWeight] = useState("");
	const [weightUnits, setWeightUnits] = useState("lbs");
	const [quantity, setQuantity] = useState("");
	const [tagString, setTagString] = useState("");
	const [image, setImage] = useState("");
	const [filename, setFilename] = useState("Product Image");
	const dispatch = useDispatch();
	const history = useHistory();

	const handleChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		setFilename(file.name);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const dimensions = `${width} ${widthUnits} x ${length} ${lengthUnits} x ${height} ${heightUnits}`;

		const tagArray = tagString.split(", ");

		const formData = {
			sold_by: seller,
			name,
			price,
			category,
			description,
			dimensions,
			weight: `${weight} ${weightUnits}`,
			tags: tagArray,
			quantity,
			image: null,
		};

		if (image) {
			const data = new FormData();
			data.append("file", image);
			const response = await fetch("/api/store/upload", {
				method: "POST",
				body: data,
			});
			const resJSON = await response.json();
			formData["image"] = resJSON.filename;
		}

		await dispatch(createProduct(formData));
		onClose();
		return history.push('/shop');
	};

	return (
		<>
			<form className="product-form" onSubmit={handleSubmit}>
				<div className="field-holder">
					<label className="form-label" htmlFor="name">
						Name
					</label>
					<input
						className="signup-form-input"
						required
						type="text"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="price">
						Price
					</label>
					<input
						className="signup-form-input"
						required
						type="number"
						step="any"
						name="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="category">
						Category
					</label>
					<select
						className="product-form-select"
						required
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value="Clothing">Clothing</option>
						<option value="Jewelry">Jewelry</option>
						<option value="Home">Home</option>
					</select>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="description">
						Description
					</label>
					<textarea
						className="form-textarea"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="width">
						Width
					</label>
					<div className="select-div">
						<input
							className="product-select-input"
							type="number"
							step="any"
							value={width}
							onChange={(e) => setWidth(e.target.value)}
						/>
						<select
							className="product-unit-select"
							value={widthUnits}
							onChange={(e) => setWidthUnits(e.target.value)}
						>
							<option value="in">Inches</option>
							<option value="ft">Feet</option>
							<option value="cm">Centimeters</option>
						</select>
					</div>
				</div>
				<div>
					<label className="form-label" htmlFor="length">
						Length
					</label>
					<div className="select-div">
						<input
							className="product-select-input"
							type="number"
							step="any"
							value={length}
							onChange={(e) => setLength(e.target.value)}
						/>
						<select
							className="product-unit-select"
							value={lengthUnits}
							onChange={(e) => setLengthUnits(e.target.value)}
						>
							<option value="in">Inches</option>
							<option value="ft">Feet</option>
							<option value="cm">Centimeters</option>
						</select>
					</div>
				</div>
				<div>
					<label className="form-label" htmlFor="height">
						Height
					</label>
					<div className="select-div">
						<input
							className="product-select-input"
							type="number"
							step="any"
							value={height}
							onChange={(e) => setHeight(e.target.value)}
						/>
						<select
							className="product-unit-select"
							value={heightUnits}
							onChange={(e) => setHeightUnits(e.target.value)}
						>
							<option value="in">Inches</option>
							<option value="ft">Feet</option>
							<option value="cm">Centimeters</option>
						</select>
					</div>
				</div>
				<div>
					<label className="form-label" htmlFor="weight">
						Weight
					</label>
					<div className="select-div">
						<input
							className="product-select-input"
							type="number"
							step="any"
							value={weight}
							onChange={(e) => setWeight(e.target.value)}
						/>
						<select
							className="product-unit-select"
							value={weightUnits}
							onChange={(e) => setWeightUnits(e.target.value)}
						>
							<option value="lbs">Pounds</option>
							<option value="oz">Ounces</option>
							<option value="kg">Kilograms</option>
						</select>
					</div>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="quantity">
						Quantity
					</label>
					<input
						className="signup-form-input"
						type="number"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="tags">
						Tags
					</label>
					<input
						className="signup-form-input"
						type="text"
						value={tagString}
						onChange={(e) => setTagString(e.target.value)}
						placeholder="e.g. Ring, Soccer, etc"
					/>
				</div>
				<div className="form-upload-div">
					<p>{filename}</p>
					<label className="upload-choice" htmlFor="image">
						Select<span className="login-spacer"></span>
						<i className="far fa-folder-open"></i>
					</label>
					<input id="image" type="file" onChange={handleChange} />
				</div>
				<div>
					<button className="login-button" type="submit">
						Submit<span className="login-spacer"></span>
						<i className="fas fa-arrow-circle-right"></i>
					</button>
				</div>
			</form>
		</>
	);
};

export default ProductForm;
