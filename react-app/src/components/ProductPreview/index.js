// import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductPreview.css";

const ProductPreview = (props) => {
	// const currentUser = useSelector((state) => state.session.user);
	const product = props.product;
	const [rating, setRating] = useState("");

	useEffect(() => {
		parseRating();
	}, []);

	const parseRating = () => {
		const ratings = product.rating;
		console.log(ratings);
		if (ratings.length === 0) {
			return;
		} else {
			let totalRating = 0;
			for (let i = 0; i < ratings.length; i++) {
				totalRating += parseInt(ratings[i].rating);
			}
			return setRating(parseInt(totalRating) / parseInt(ratings.length));
		}
	};

	return (
		<div className="product-container">
			<div className="product-preview-header">
				<p>{product.name}</p> <p>{product.price}</p>
			</div>

			<Link to={`product/${product.id}`}>
				<div className="product-preview-image-container">
					<img
						className="product-preview-image"
						src={`https://crafty-app.s3.us-east-2.amazonaws.com/${product.image}`}
						alt="product"
					/>
				</div>
			</Link>
			<div className="product-preview-rating">
				{rating ? (`${rating} stars`) : ("No ratings yet")}
			</div>
		</div>
	);
};

export default ProductPreview;
