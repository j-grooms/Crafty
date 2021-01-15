import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { getProductById } from "../../store/product";
import { getFavorites } from "../../store/favorite";
import FavoriteButton from "../FavoriteButton";
import FollowButton from "../FollowButton";
import CartButton from "../CartButton";
import "./ProductView.css";

const ProductView = () => {
	const [loaded, setLoaded] = useState(false);
	const product = useSelector((state) => state.products.product);
	const currentUser = useSelector((state) => state.session.user);
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		(async () => {
			await dispatch(getFavorites(currentUser.id));
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
					<div className="product-view-controls">
						<button onClick={editProduct}>EDIT</button>
						<button onClick={deleteProduct}>DELETE</button>
					</div>
				) : (
					<div className="product-view-controls">
						<FavoriteButton />
						<FollowButton seller={product.user.id} />
						{product.quantity <= 0 ? (
							<p className="warning-header">SOLD OUT</p>
						) : (
							<CartButton />
						)}
					</div>
				)}
				<div className="product-view-image-container">
					<img
						className="product-view-image"
						src={`https://crafty-app.s3.us-east-2.amazonaws.com/${product.image}`}
						alt="product"
					/>
				</div>
				<div className="product-view-details">
					<p>{product.name}</p>
					<p>Description: {product.description}</p>
					<p>
						Sold by:{" "}
						<Link to={`/user/${product.user.id}`}>{product.user.username}</Link>
					</p>
					<p>Category: {product.category}</p>
					{product.quantity <= 0 ? (
						<p>Out of Stock</p>
					) : (
						<p>Number in stock: {product.quantity}</p>
					)}
					<p>Dimensions: {product.dimensions}</p>
					<p>Weight: {product.weight}</p>
				</div>
				<div className="product-view-ratings">
					{product.rating.map((rating, i) => (
						<div key={i}>
							<p>
								{rating.rating} stars
							</p>
							<p>{rating.user.username}</p>
							<p>{rating.comment}</p>
						</div>
					))}
				</div>
			</>
		)
	);
};

export default ProductView;
