import { useEffect, useState } from "react"

const ProductReview = ({ rating }) => {

    const generateStars = (int) => {
        const stars = [];
        for (let i = 0; i < rating.rating; i++) {
            stars.push(<i className="fas fa-star"></i>);
        };
        return stars;
    }

	return (
		<div className="product-review">
			<p>{generateStars(rating.rating).map(star => star)}</p>
			<p>By {rating.user.username}</p>
			<p>{rating.comment}</p>
		</div>
	);
};

export default ProductReview;
