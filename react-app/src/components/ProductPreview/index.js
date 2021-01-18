import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductPreview.css";

const ProductPreview = (props) => {
	const product = props.product;
	const [rating, setRating] = useState("");

	const lowStock = (quantity) => {
		if (quantity === 0) {
			return <p>Sold out!</p>
		} else if (quantity <= 5 && quantity > 0) {
			return <p>Only {quantity} left!</p>
		}
	}

	useEffect(() => {
		(async() => {
			const ratings = product.rating;
			if (ratings.length === 0) {
				return;
			} else {
				let totalRating = 0;
				for (let i = 0; i < ratings.length; i++) {
					totalRating += parseInt(ratings[i].rating);
				}
				return setRating(parseInt(totalRating) / parseInt(ratings.length));
			}
		})();
	}, [product.rating]);

	return (
		<div className="product-container">
			<div className="product-preview-header">
				<p className="product-preview-name">{product.name}</p> <p>$ {product.price}</p>
			</div>

			<Link to={`/product/${product.id}`}>
				<div className="product-preview-image-container">
					<img
						className="product-preview-image"
						src={`https://crafty-app.s3.us-east-2.amazonaws.com/${product.image}`}
						alt="product"
					/>
				</div>
			</Link>
			<div className="product-preview-rating">
				{product.quantity < 5 ? lowStock(product.quantity) : <p></p>}
				{rating
					? <p className="preview-rating">{rating} <i className="far fa-star product-preview-star"></i></p>
					: "No ratings yet"}
			</div>
		</div>
	);
};

export default ProductPreview;
