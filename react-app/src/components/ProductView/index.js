import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getProductById } from "../../store/product";
import FavoriteButton from "../FavoriteButton"
import { checkFavorite } from "../../store/favorite";

const ProductView = () => {
	const [loaded, setLoaded] = useState(false);
	const product = useSelector((state) => state.products.product);
	const currentUser = useSelector((state) => state.session.user);
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		(async () => {
			await dispatch(checkFavorite(currentUser.id))
			await dispatch(getProductById(id));
			return setLoaded(true);
		})();
	}, [dispatch, id, currentUser]);

	const editProduct = () => history.push(`/product/edit/${id}`);
	const deleteProduct = () => history.push(`/product/delete/${id}`);


	return (
		loaded && (
			<>
				{currentUser.id === product.user.id ? (
					<>
						<button onClick={editProduct}>EDIT</button>
						<button onClick={deleteProduct}>DELETE</button>
					</>
				) : (
					<><FavoriteButton /></>
				)}
				<p>Product #{product.id}</p>
			</>
		)
	);
};

export default ProductView;
