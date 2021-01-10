import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { removeFromCart, addToCart } from "../../store/cart";

const CartButton = () => {
	const cart = useSelector((state) => state.cart.cart);
	const productId = useSelector((state) => state.products.product.id);
	const [inCart, setInCart] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			for (let i = 0; i < cart.length; i++) {
				if (cart[i] === productId) {
					await setInCart(true);
				}
			}
			await setLoaded(true);
		})();
	}, [cart, productId]);

	const handleCart = async () => {
		if (inCart) {
			await dispatch(removeFromCart(productId));
			return setInCart(false);
		} else {
			await setInCart(true);
			return dispatch(addToCart(productId));
		}
	};

	return (
		loaded && (
			<>
				{inCart ? (
					<button onClick={handleCart}>Remove from cart</button>
				) : (
					<button onClick={handleCart}>Add to cart</button>
				)}
			</>
		)
	);
};

export default CartButton;
