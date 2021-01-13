import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../store/product";
import { getCart } from "../../store/cart"
import ProductPreview from "../ProductPreview";
import './Feed.css'

const Feed = () => {
	const [loaded, setLoaded] = useState(false);
	const products = useSelector((state) => state.products.products);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(getCart())
			await dispatch(fetchAllProducts());
			return setLoaded(true);
		})();
	}, [dispatch]);

	return (
		loaded && (
			<>
			<p className="feed-header">All Items</p>
			<div className="feed-container">
				{products.map((product, i) => (
					<ProductPreview key={product.name.concat(i)} product={product} />
				))}
			</div>
			</>
		)
	);
};

export default Feed;
