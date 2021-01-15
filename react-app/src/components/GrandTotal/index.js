import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const GrandTotal = () => {
	const quantities = useSelector((state) => state.quantities);
	const products = useSelector((state) => state.checkout.products);

	const [grandTotal, setGrandTotal] = useState(0);

	// const calculateTotal = () => {
	// 	console.log("calculating total");
	// 	let total = 0;
	// 	for (let i = 0; i <= products.length; i++) {
	// 		let product = products[i];
	// 		if (product === undefined) continue;
	// 		if (typeof quantities[product.id] !== "number") {
	// 			continue;
	// 		}
	// 		let price = quantities[product.id] * product.price;
	// 		total += price;
	// 	}
	// 	setGrandTotal(total);
	// };

	useEffect(() => {
		(() => {
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
			setGrandTotal(total);
		})();
		// calculateTotal();
	}, [quantities, products]);

	return <span>{grandTotal.toFixed(2)}</span>;
};

export default GrandTotal;
