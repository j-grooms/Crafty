import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../store/product";
import { getFavorites } from "../../store/favorite";
import Modal from "../Modal";
import ProductDeleteForm from "../ProductDeleteForm";
import ProductEditForm from "../ProductEditForm";
import ProductReview from "../ProductReview";
import FavoriteButton from "../FavoriteButton";
import FollowButton from "../FollowButton";
import CartButton from "../CartButton";
import "./ProductView.css";

const ProductView = () => {
	const [loaded, setLoaded] = useState(false);
	const product = useSelector((state) => state.products.product);
	const currentUser = useSelector((state) => state.session.user);
	const purchaseHistory = useSelector((state) => state.history.history);
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [hasPurchased, setHasPurchased] = useState(false);
	const [hasReviewed, setHasReviewed] = useState(false);
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			console.log("ID", id)
			for (let i = 0; i < purchaseHistory.length; i++) {
				if (purchaseHistory[i].product.id === parseInt(id)) {
					await setHasPurchased(true);
					break;
				};
			};
			console.log("not purchased")
			for (let i = 0; i < currentUser.ratings.length; i++) {
				if (currentUser.ratings[i].product_id === parseInt(id)) {
					await setHasReviewed(true);
					break;
				}
			}
			await dispatch(getFavorites(currentUser.id));
			await dispatch(getProductById(id));
			return setLoaded(true);
		})();
	}, [dispatch, id, currentUser, purchaseHistory]);

	const reviewButtonLogic = () => {
		if (hasReviewed && hasPurchased) {
			return <p>Reviewed</p>
		} else if (hasPurchased) {
			return <p>Write a review</p>
		} else {
			return <p>Purchase to review</p>
		}
	};

	const editProduct = () => setEditing(true);
	const deleteProduct = () => setDeleting(true);

	return (
		loaded && (
			<div className="product-view-grid">
				<div className="product-view-image-container">
					<img
						className="product-view-image"
						src={`https://crafty-app.s3.us-east-2.amazonaws.com/${product.image}`}
						alt="product"
					/>
				</div>
				{currentUser.id === product.user.id ? (
					<div className="product-view-controls">
						<button className="login-button" onClick={editProduct}>Edit Product</button>
						<button className="warning-button" onClick={deleteProduct}>Delete Product</button>
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
				<div className="product-view-details">
					<p className="product-view-name">{product.name}</p>
					<p>
						<span className="product-detail-header">Description: </span>{" "}
						{product.description}
					</p>
					<p>
						<span className="product-detail-header">Sold by: </span>
						<Link to={`/user/${product.user.id}`}>
							{product.user.username} <i className="fas fa-arrow-circle-right"></i>
						</Link>
					</p>
					<p>
						<span className="product-detail-header">Category: </span>
						{product.category}
					</p>
					{product.quantity <= 0 ? (
						<p className="product-detail-header">Out of Stock</p>
					) : (
						<p>
							<span className="product-detail-header">Number in Stock: </span>
							{product.quantity}
						</p>
					)}
					<p>
						<span className="product-detail-header">Dimensions: </span>
						{product.dimensions}
					</p>
					<p>
						<span className="product-detail-header">Weight: </span>
						{product.weight}
					</p>
				</div>
				<div className="product-view-ratings">
					<p className="product-view-ratings-header">Ratings</p>
					{reviewButtonLogic()}
					{product.rating.length === 0 ? <p>No reviews yet</p> : <></>}
					{product.rating.map((rating, i) => (
						<ProductReview key={i} rating={rating} />
					))}
				</div>
				<Modal open={editing} onClose={() => setEditing(false)}>
					<ProductEditForm onClose={() => setEditing(false)}/>
				</Modal>
				<Modal open={deleting} onClose={() => setDeleting(false)}>
					<ProductDeleteForm />
				</Modal>
			</div>
		)
	);
};

export default ProductView;
