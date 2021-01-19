import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCartItems } from "../../store/checkout";
import { getCart, removeFromCart } from "../../store/cart";
import { updateQuantity } from "../../store/quantities";
import GrandTotal from "../GrandTotal";

import "./CheckoutForm.css";

const CheckoutForm = () => {
	const cart = useSelector((state) => state.cart.cart);
	const products = useSelector((state) => state.checkout.products);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const generateOptions = (int) => {
		const options = [];
		for (let i = 1; i <= int; i++) {
			options.push(
				<option key={i} value={i}>
					{i}
				</option>
			);
		}
		return options;
	};

	useEffect(() => {
		(async () => {
			await dispatch(getCart());
		})();
	}, [dispatch]);

	useEffect(() => {
		(async () => {
			await dispatch(getCartItems({ cart }));
			await setLoaded(true);
		})();
	}, [dispatch, cart]);

	if (!products.length)
		return (
			<div className="empty-cart-div">
				<p className="cart-empty-text">
					No products are currently in your cart!
				</p>
				<button className="login-button" onClick={() => history.push("/shop")}>
					Back to Shop
				</button>
			</div>
		);

	return (
		loaded && (
			<>
				{products.map((product, i) => {
					dispatch(updateQuantity(product.id, 1));
					return (
						<div key={i} className="cart-item">
							<div className="cart-image-container">
								<img
									className="cart-image"
									src={`https://crafty-app.s3.us-east-2.amazonaws.com/${product.image}`}
									alt="checkout"
								/>
							</div>
							<div className="cart-quantity">
								<label htmlFor="quantity">Quantity</label>
								<span className="login-spacer"></span>
								<select
									onChange={async (e) => {
										dispatch(
											updateQuantity(product.id, parseInt(e.target.value))
										);
									}}
									name="quantity"
								>
									{generateOptions(product.quantity).map((option) => option)}
								</select>
							</div>
							<div className="cart-item-price">{product.price}</div>
							<button
								className="cart-remove-button"
								onClick={() => {
									dispatch(removeFromCart(product.id));
								}}
							>
								<i className="fas fa-window-close"></i>
							</button>
						</div>
					);
				})}
				<GrandTotal />
			</>
		)
	);
};

export default CheckoutForm;
