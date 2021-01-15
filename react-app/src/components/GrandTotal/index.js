import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { checkout } from "../../store/checkout";
import { emptyCart } from "../../store/cart";
import { resetQuantity } from "../../store/quantities"

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
		await dispatch(resetQuantity())
		return history.push('/shop');
	};

	if (!enoughMoney) {
		return (
			<div>
				<p>Total: {grandTotal}</p>
				<p>Add more funds to complete the transaction</p>
			</div>
		);
	}

	return (
		<div>
			<p>Total: {grandTotal}</p>
			<button onClick={handleCheckout}>Checkout</button>
		</div>
	);
};

export default GrandTotal;
