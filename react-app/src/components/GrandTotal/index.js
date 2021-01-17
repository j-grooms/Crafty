import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { checkout } from "../../store/checkout";
import { emptyCart } from "../../store/cart";
import { resetQuantity } from "../../store/quantities";
import { getHistory } from "../../store/history";
import { getRatings } from "../../store/ratings";

const GrandTotal = () => {
	const currentUser = useSelector((state) => state.session.user);
	const quantities = useSelector((state) => state.quantities);
	const products = useSelector((state) => state.checkout.products);
	const [enoughMoney, setEnoughMoney] = useState(false);
	const [grandTotal, setGrandTotal] = useState(0);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		(async () => {
			let total = 0;
			for (let i = 0; i <= products.length; i++) {
				let product = products[i];
				if (product === undefined) continue;
				if (typeof quantities[product.id] !== "number") {
					continue;
				}
				let price = quantities[product.id] * product.price;
				total += price;
			}
			await setGrandTotal(total.toFixed(2));
		})();
	}, [quantities, products]);

	useEffect(() => {
		(async () => {
			if (grandTotal <= currentUser.money) {
				await setEnoughMoney(true);
			} else {
				await setEnoughMoney(false);
			}
		})();
	}, [grandTotal, currentUser.money, quantities]);

	const handleCheckout = async (event) => {
		event.preventDefault();
		const body = { quantities, grandTotal, user: currentUser.id };
		await dispatch(checkout(body));
		await dispatch(emptyCart());
		await dispatch(resetQuantity());
		await dispatch(getHistory(currentUser.id));
		await dispatch(getRatings(currentUser.id));
		return history.push("/shop");
	};

	if (!enoughMoney) {
		return (
			<div className="checkout-container">
				<p>Grand Total: {grandTotal}</p>
				<p className="warning-header">
					Add more funds to complete the transaction
				</p>
			</div>
		);
	}

	return (
		<div className="checkout-container">
			<p>Grand Total: ${grandTotal}</p>
			<button className="login-button" onClick={handleCheckout}>
				Checkout<span className="login-spacer"></span>
				<i className="fas fa-arrow-circle-right"></i>
			</button>
		</div>
	);
};

export default GrandTotal;
