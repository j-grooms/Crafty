import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteProduct } from '../../store/product'

const ProductDeleteForm = () => {
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const product = useSelector((state) => state.products.product);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = { username, password }
		await dispatch(deleteProduct(formData, product.id));
		return history.push('/shop')
	};

	return (
		<form onSubmit={handleSubmit}>
			<p>You are about to delete product: {product.name}</p>
			<p>
				This will also delete all ratings and data associated with this product
			</p>
			<p>Enter your credentials below</p>
			<div>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit">Delete</button>
		</form>
	);
};

export default ProductDeleteForm;
