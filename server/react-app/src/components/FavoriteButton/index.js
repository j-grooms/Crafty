import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addFavorite, removeFavorite } from "../../store/session";

const FavoriteButton = () => {
	const currentFavorites = useSelector((state) => state.favorites.favorites);
	const currentUser = useSelector((state) => state.session.user);
	const [isFavorite, setIsFavorite] = useState(false);
	const product = useSelector((state) => state.products.product);
	const [loaded, setLoaded] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			for (let i = 0; i < currentFavorites.length; i++) {
				let favorite = currentFavorites[i];
				if (favorite.product.id === product.id) {
					await setIsFavorite(true);
				}
			}
			return setLoaded(true);
		})();
	}, [currentFavorites, product.id]);

	const handleFavorite = async() => {
		if (isFavorite) {
			await dispatch(removeFavorite(product.id, currentUser.id));
			return setIsFavorite(false);
		} else {
			await setIsFavorite(true);
			return dispatch(addFavorite(product.id, currentUser.id));
		}
	};

	return (
		loaded && (
			<>
				{isFavorite ? (
					<button className="warning-button" onClick={handleFavorite}>Unfavorite</button>
				) : (
					<button className="login-button"onClick={handleFavorite}>Favorite</button>
				)}
			</>
		)
	);
};

export default FavoriteButton;
