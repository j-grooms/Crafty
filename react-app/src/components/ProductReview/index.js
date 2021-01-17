import { useState } from "react";
import ReviewEditForm from "../ReviewEditForm";
import Modal from "../Modal";

const ProductReview = ({ rating, currentUser }) => {
    const [editing, setEditing] = useState(false);

	const generateStars = (int) => {
		const stars = [];
		for (let i = 0; i < rating.rating; i++) {
			stars.push(<i key={i} className="fas fa-star"></i>);
		}
		return stars;
	};

	return (
		<>
			<div className="review-container">
				<div className="product-review">
					<p>{generateStars(rating.rating).map((star) => star)}</p>
					<p className="review-user">By {rating.username}</p>
					<p>{rating.comment}</p>
				</div>
				<div className="review-edit-button">
					{currentUser.id === rating.userId ? (
						<button onClick={() => setEditing(true)}>
							<i className="fas fa-pencil-alt"></i>
						</button>
					) : (
						<></>
					)}
				</div>
			</div>
            <Modal open={editing} onClose={() => setEditing(false)}>
                <ReviewEditForm rating={rating} onClose={() => setEditing(false)} />
            </Modal>
		</>
	);
};

export default ProductReview;
