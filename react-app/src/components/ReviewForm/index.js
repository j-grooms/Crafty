import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ReviewForm = () => {
	const currentUser = useSelector((state) => state.session.user);
	const [stars, setStars] = useState("");
	const [comment, setComment] = useState("");
	const dispatch = useDispatch();

	return (
		<form className="review-form">
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
                    onChange={(e) => setStars(parseInt(e.target.value))}
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
		</form>
	);
};

export default ReviewForm;
