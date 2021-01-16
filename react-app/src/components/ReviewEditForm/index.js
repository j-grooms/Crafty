import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { rateProduct } from "../../store/product";

const ReviewForm = ({ onClose }) => {
	const currentUser = useSelector((state) => state.session.user);
	const [stars, setStars] = useState("");
	const [comment, setComment] = useState("");
	const { id } = useParams();
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = {
			user_id: currentUser.id,
			rating: stars,
			comment,
		};
		console.log(stars);
		dispatch(rateProduct(id, formData));
		onClose();
	};

	return (
		<form onSubmit={handleSubmit} className="review-form">
			<div className="field-holder">
				<label className="form-label" htmlFor="stars">
					Stars *
				</label>
				<input
					className="signup-form-input"
					required
					type="number"
					min="0"
					max="5"
					placeholder="Out of 5 stars"
					value={stars}
					onChange={(e) => setStars(e.target.value)}
				/>
			</div>
			<div className="field-holder">
				<label className="form-label" htmlFor="comment">
					Comment *
				</label>
				<textarea
					className="form-textarea"
					name="comment"
					placeholder="Tell use about your experience with this product"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
			</div>
			<button className="login-button">
				Publish<span className="login-spacer"></span>
				<i className="fas fa-pencil-alt"></i>
			</button>
		</form>
	);
};

export default ReviewForm;
