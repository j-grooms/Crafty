import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../store/product";
import ProductPreview from "../ProductPreview";

const Feed = () => {
	const [loaded, setLoaded] = useState(false);
	const products = useSelector((state) => state.products.products);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(fetchAllProducts());
			return setLoaded(true);
		})();
	}, [dispatch]);

	return (
		loaded && (
			<>
				{products.map((product, i) => (
					<ProductPreview key={product.name.concat(i)} product={product} />
				))}
			</>
		)
	);
};

export default Feed;
