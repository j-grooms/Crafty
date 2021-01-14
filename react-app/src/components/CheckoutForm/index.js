import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCartItems } from "../../store/checkout";
import { getCart } from "../../store/cart";
import ProductPreview from "../ProductPreview";
import "./CheckoutForm.css";

const CheckoutForm = () => {
	const cart = useSelector((state) => state.cart.cart);
	const products = useSelector((state) => state.checkout.products);
	const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const generateOptions = (int) => {
        const options = []
        for (let i = 1; i <= int; i++) {
            options.push(<option value={i}>{i}</option>)
        };
        return options
    }

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
				{products.map((product, i) => (
					<div key={i} className="cart-item">
						<div className="cart-image-container">
							<img
								className="cart-image"
								src={`https://crafty-app.s3.us-east-2.amazonaws.com/${product.image}`}
							/>
						</div>
						<div className="cart-quantity">
							<label htmlFor="quantity">Quantity</label>
                            <select name="quantity">
                                {generateOptions(product.quantity).map(option => option)}
                            </select>
						</div>
					</div>
				))}
			</>
		)
	);
};

export default CheckoutForm;
