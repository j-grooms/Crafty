import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getProductById } from "../../store/product";

const ProductView = () => {
	const [loaded, setLoaded] = useState(false);
	const product = useSelector((state) => state.products.product);
	const currentUser = useSelector((state) => state.session.user);
	const [isFavorite, setIsFavorite] = useState(false);
	const { id } = useParams();
	const dispatch = useDispatch();
	let history = useHistory();

	useEffect(() => {
		(async () => {
			await dispatch(getProductById(id));

			for (let i = 0; i < currentUser.favorites.length; i++) {
				let favorite = currentUser.favorites[i];
				if (favorite.product.id === product.id) await setIsFavorite(true);
			}

			return setLoaded(true);
		})();
	}, [dispatch, id]);

	const editProduct = () => history.push(`/product/edit/${id}`);
	const deleteProduct = () => history.push(`/product/delete/${id}`);
	const handleFavorite = () => {
		console.log(isFavorite);
	};

	return (
		loaded && (
			<>
				{currentUser.id === product.user.id ? (
					<>
						<button onClick={editProduct}>EDIT</button>
						<button onClick={deleteProduct}>DELETE</button>
					</>
				) : (
					<><button onClick={handleFavorite}>{isFavorite ? "add favorite" : "remove favorite"}</button></>
				)}
				<p>Product #{product.id}</p>
			</>
		)
	);
};

export default ProductView;
