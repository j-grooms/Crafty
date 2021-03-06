import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProduct } from "../../store/product";
import { getProductById } from "../../store/product";

const ProductEditForm = ({onClose}) => {
	const [loaded, setLoaded] = useState(false);
	const { id } = useParams();
	const seller = useSelector((state) => state.session.user.id);
	const product = useSelector((state) => state.products.product);
	const dimensions = product.dimensions.split(" x ");
	const history = useHistory();

	const [name, setName] = useState(product.name);
	const [price, setPrice] = useState(product.price);
	const [category, setCategory] = useState(product.category);
	const [description, setDescription] = useState(product.description);
	const [height, setHeight] = useState(dimensions[2].split(" ")[0]);
	const [width, setWidth] = useState(dimensions[1].split(" ")[0]);
	const [length, setLength] = useState(dimensions[0].split(" ")[0]);
	const [heightUnits, setHeightUnits] = useState(dimensions[2].split(" ")[1]);
	const [widthUnits, setWidthUnits] = useState(dimensions[1].split(" ")[1]);
	const [lengthUnits, setLengthUnits] = useState(dimensions[0].split(" ")[1]);
	const [weight, setWeight] = useState(product.weight.split(" ")[0]);
	const [weightUnits, setWeightUnits] = useState(product.weight.split(" ")[1]);
	const [quantity, setQuantity] = useState(product.quantity);
	const [tagString, setTagString] = useState(product.tags.join(", "));
	const [image, setImage] = useState("");
	const [filename, setFilename] = useState("Product Image");
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(getProductById(id));
			return setLoaded(true);
		})();
	}, [dispatch, id]);

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
			id: product.id,
			sold_by: seller,
			name,
			price,
			category,
			description,
			dimensions,
			weight: `${weight} ${weightUnits}`,
			tags: tagArray,
			quantity,
			image: product.image,
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

		await dispatch(editProduct(formData, product.id));
		onClose();
		return history.push(`/product/${id}`);
	};

	return (
		loaded && (
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
					<div className="field-holder">
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
					<div className="field-holder">
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
					<div className="field-holder">
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
							Save Changes
						</button>
					</div>
				</form>
			</>
		)
	);
};

export default ProductEditForm;
