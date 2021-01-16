const ProductReview = ({ rating }) => {

    const generateStars = (int) => {
        const stars = [];
        for (let i = 0; i < rating.rating; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        };
        return stars;
    }

	return (
		<div className="product-review">
			<p>{generateStars(rating.rating).map(star => star)}</p>
			<p className="review-user">By {rating.username}</p>
			<p>{rating.comment}</p>
		</div>
	);
};

export default ProductReview;
