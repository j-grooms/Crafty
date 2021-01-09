import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addFavorite, removeFavorite } from "../../store/session"
import { checkFavorite } from "../../store/favorite"

const FavoriteButton = () => {
	const currentFavorites = useSelector((state) => state.session.user.favorites);
	const currentUser = useSelector((state) => state.session.user)
    const [isFavorite, setIsFavorite] = useState(false);
	const product = useSelector((state) => state.products.product);

    const dispatch = useDispatch();

		useEffect(() => {
			(async () => {
				for (let i = 0; i < currentFavorites.length; i++) {
					let favorite = currentFavorites[i];
					if (favorite.product.id === product.id) await setIsFavorite(true);
				}
			})();
		}, [currentFavorites, currentUser]);

	const handleFavorite = () => {
		if (isFavorite) return dispatch(removeFavorite(product.id, currentUser.id));
		return dispatch(addFavorite(product.id, currentUser.id))
	};

	return (
        <>
            {isFavorite ? <button onClick={handleFavorite}>remove favorite</button> : <button onClick={handleFavorite}>add favorite</button>}
        </>
    );
};

export default FavoriteButton;
