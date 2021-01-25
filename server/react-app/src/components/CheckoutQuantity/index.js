import { useDispatch } from "react-redux";
import { updateQuantity } from "../../store/quantities";


const CheckoutQuantity = ({ product }) => {
    const dispatch = useDispatch();

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


	const handleQuantity = async (e) => {
		dispatch(updateQuantity(product.id, parseInt(e.target.value)));
	};


	return (
		<div className="cart-quantity">
			<label htmlFor="quantity">Quantity</label>
			<span className="login-spacer"></span>
			<select onChange={handleQuantity} name="quantity">
				{generateOptions(product.quantity).map((option) => option)}
			</select>
		</div>
	);
};

export default CheckoutQuantity;
