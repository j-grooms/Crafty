import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../store/cart";
import { getProductsByCategory } from "../../store/product";

const CategoryFeed = () => {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const { category } = useParams();
	const products = useSelector((state) => state.products.products);

	useEffect(() => {
		(async () => {
			await dispatch(getCart());
			await dispatch(getProductsByCategory(category));
			await setLoaded(true);
		})();
	}, [dispatch, category]);

	return (
		loaded && (
			<>
				<p className="feed-header">{category}</p>
				<div className="feed-container">
					{products.map((product, i) => (
						<ProductPreview key={product.name.concat(i)} product={product} />
					))}
				</div>
			</>
		)
	);
};

export default CategoryFeed;
