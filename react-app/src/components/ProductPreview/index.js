import { useSelector } from 'react-redux';
import './Product.css'

const ProductPreview = (props) => {
    const currentUser = useSelector(state => state.session.user);
    const product = props.product

    return (
        <div className="product-container">
            <p>{product.name} {product.price}</p>
            <img className="product-preview-image" src={`https://crafty-app.s3.us-east-2.amazonaws.com/${product.image}`} alt="product" />
        </div>
    )
};

export default ProductPreview;
