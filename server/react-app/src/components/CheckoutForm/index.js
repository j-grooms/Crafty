import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCartItems } from "../../store/checkout";
import { getCart, removeFromCart } from "../../store/cart";
import { updateQuantity } from "../../store/quantities";
import GrandTotal from "../GrandTotal";
import CheckoutQuantity from "../CheckoutQuantity";

import "./CheckoutForm.css";

const CheckoutForm = () => {
	const cart = useSelector((state) => state.cart.cart);
	const products = useSelector((state) => state.checkout.products);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();


	useEffect(() => {
		(async () => {
			await dispatch(getCart());
			await setLoaded(true);
		})();
	}, [dispatch]);

	useEffect(() => {
		(async () => {
			await dispatch(getCartItems({ cart }));
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
							<CheckoutQuantity product={product} />
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
