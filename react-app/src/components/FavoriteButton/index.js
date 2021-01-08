import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const FavoriteButton = () => {
	const currentFavorites = useSelector((state) => state.session.user.favorites);
    const [isFavorite, setIsFavorite] = useState(false);
	const product = useSelector((state) => state.products.product);

    const dispatch = useDispatch();

	const handleFavorite = () => {
		console.log(isFavorite);
	};

	useEffect(() => {
		(async () => {
			for (let i = 0; i < currentFavorites.length; i++) {
				let favorite = currentFavorites[i];
				if (favorite.product.id === product.id) await setIsFavorite(true);
			}
		})();
	}, []);

	return (
        <>
            {isFavorite ? <button onClick={handleFavorite}>remove favorite</button> : <button onClick={handleFavorite}>add favorite</button>}
        </>
    );
};

export default FavoriteButton;
