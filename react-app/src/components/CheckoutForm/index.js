import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCartItems } from "../../store/checkout";
import { getCart } from "../../store/cart";
import{ updateQuantity } from "../../store/quantities";
import GrandTotal from "../GrandTotal"
import "./CheckoutForm.css";

const CheckoutForm = () => {
	const cart = useSelector((state) => state.cart.cart);
    const products = useSelector((state) => state.checkout.products);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	const generateOptions = (int) => {
		const options = [];
		for (let i = 1; i <= int; i++) {
			options.push(<option key={i} value={i}>{i}</option>);
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

	return (
		loaded && (
			<>
				{products.map((product, i) => {
                    dispatch(updateQuantity(product.id, 1))
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
								<select
									onChange={async (e) => {
                                        dispatch(updateQuantity(product.id, parseInt(e.target.value)))
									}}
									name="quantity"
								>
									{generateOptions(product.quantity).map((option) => option)}
								</select>
							</div>
                            <div className="cart-item-price">{product.price}</div>
						</div>
					);
				})}
                <GrandTotal/>
			</>
		)
	);
};

export default CheckoutForm;
