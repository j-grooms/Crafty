import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { getProductById } from "../../store/product";

const ProductView = () => {
	const [loaded, setLoaded] = useState(false);
    const product = useSelector((state) => state.products.product);
    const currentUser = useSelector((state) => state.session.user)
	const { id } = useParams();
	const dispatch = useDispatch();
	let history = useHistory();

	useEffect(() => {
		(async () => {
			await dispatch(getProductById(id));
			return setLoaded(true);
		})();
	}, [dispatch, id]);

	const editProduct = () => history.push(`/product/edit/${id}`);

	return (
		loaded && (
			<>
				{currentUser.id === product.user.id ? <button onClick={editProduct}>EDIT</button> : <></>}
				<p>Product #{product.id}</p>
			</>
		)
	);
};

export default ProductView;
