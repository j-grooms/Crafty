import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteProduct } from "../../store/product";

const ProductDeleteForm = () => {
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const product = useSelector((state) => state.products.product);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = { username, password };
		await dispatch(deleteProduct(formData, product.id));
		return history.push("/shop");
	};

	return (
		<form className="deletion-form" onSubmit={handleSubmit}>
			<div className="warning-div">
				<p className="warning-header">
					You are about to delete: {product.name}
				</p>
				<p className="warning-text">
					This will also delete all ratings and data associated with this
					product. Enter your credentials below
				</p>
			</div>
			<div>
				<label className="form-label"htmlFor="username">Username</label>
				<input
					className="warning-input"
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label className="form-label"htmlFor="password">Password</label>
				<input
					className="warning-input"
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button className="warning-button" type="submit">Delete Product</button>
		</form>
	);
};

export default ProductDeleteForm;
