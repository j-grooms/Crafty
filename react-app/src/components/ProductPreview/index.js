import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ProductPreview.css";

const ProductPreview = (props) => {
	const currentUser = useSelector((state) => state.session.user);
	const product = props.product;

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
		</div>
	);
};

export default ProductPreview;
