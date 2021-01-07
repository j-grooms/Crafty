import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom"

const ProductForm = () => {
	const seller = useSelector(state => state.session.user.id)
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0.00);
	const [category, setCategory] = useState("Sports");
	const [description, setDescription] = useState("");
	const [height, setHeight] = useState('');
	const [width, setWidth] = useState('');
	const [length, setLength] = useState('');
	const [heightUnits, setHeightUnits] = useState("in");
	const [widthUnits, setWidthUnits] = useState("in");
	const [lengthUnits, setLengthUnits] = useState("in");
	const [weight, setWeight] = useState("");
	const [weightUnits, setWeightUnits] = useState("lbs");
	const [quantity, setQuantity] = useState("");
	const [tags, setTags] = useState("")
	const [image, setImage] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		const dimensions = `${width}${widthUnits} x ${length}${lengthUnits} x ${height}${heightUnits}`;
		const formData = {
			sold_by: seller,
			name,
			price,
			category,
			description,
			dimensions,
			weight: `${weight}${weightUnits}`,
			tags,
		};
		console.log(dimensions)
		console.log(formData)
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name</label>
					<input
                        required
						type="text"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="price">Price</label>
					<input
                        required
						type="number"
						step="any"
						name="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="category">Category</label>
					<select
                        required
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value="Sports">Sports</option>
						<option value="Jewelry">Jewelry</option>
						<option value="Home">Home</option>
					</select>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="width">Width</label>
					<input
						type="number"
						step="any"
						value={width}
						onChange={(e) => setWidth(e.target.value)}
					/>
                    <select value={widthUnits} onChange={(e) => setWidthUnits(e.target.value)}>
                        <option value="in">Inches</option>
                        <option value="ft">Feet</option>
                        <option value="cm">Centimeters</option>
                    </select>
				</div>
				<div>
					<label htmlFor="length">Length</label>
					<input
						type="number"
						step="any"
						value={length}
						onChange={(e) => setLength(e.target.value)}
					/>
                    <select value={lengthUnits} onChange={(e) => setLengthUnits(e.target.value)}>
                        <option value="in">Inches</option>
                        <option value="ft">Feet</option>
                        <option value="cm">Centimeters</option>
                    </select>
				</div>
				<div>
					<label htmlFor="height">Height</label>
					<input
						type="number"
						step="any"
						value={height}
						onChange={(e) => setHeight(e.target.value)}
					/>
                    <select value={heightUnits} onChange={(e) => setHeightUnits(e.target.value)}>
                        <option value="in">Inches</option>
                        <option value="ft">Feet</option>
                        <option value="cm">Centimeters</option>
                    </select>
				</div>
				<div>
					<label htmlFor="weight">Weight</label>
					<input
						type="number"
						step="any"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
					/>
                    <select value={weightUnits} onChange={(e) => setWeightUnits(e.target.value)}>
                        <option value="lbs">Pounds</option>
                        <option value="oz">Ounces</option>
                        <option value="kg">Kilograms</option>
                    </select>
				</div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
				<div>
					<label htmlFor="tags">Tags</label>
					<input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. Ring, Soccer, etc" />
				</div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type="file" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
				<div>
					<button type="submit">Clicky Clicky</button>
				</div>
			</form>
		</>
	);
};

export default ProductForm;
