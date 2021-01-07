import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../store/product";

const ProductView = () => {
	const [loaded, setLoaded] = useState(false);
    const product = useSelector((state) => state.products.product);
    const currentUser = useSelector((state) => state.session.user)
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(getProductById(id));
			return setLoaded(true);
		})();
	}, [dispatch, id]);

	return (
		loaded && (
			<>
				{currentUser.id === product.user.id ? <button>EDIT</button> : <></>}
				<p>Product #{product.id}</p>
			</>
		)
	);
};

export default ProductView;
