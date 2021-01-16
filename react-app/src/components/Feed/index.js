import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../store/product";
import { getCart } from "../../store/cart"
import { getHistory } from "../../store/history";
import { getRatings } from "../../store/ratings";
import ProductPreview from "../ProductPreview";
import './Feed.css'

const Feed = () => {
	const [loaded, setLoaded] = useState(false);
	const products = useSelector((state) => state.products.products);
	const currentUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(getRatings(currentUser.id));
			await dispatch(getCart());
			await dispatch(fetchAllProducts());
			await dispatch(getHistory(currentUser.id))
			return setLoaded(true);
		})();
	}, [dispatch, currentUser.id]);

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
