import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCartItems } from "../../store/checkout"


const CheckoutForm = () => {
    const cart = useSelector((state) => state.cart.cart);
    const products = useSelector((state) => state.checkout.products);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getCartItems({cart}));
            await setLoaded(true);
        })();
    }, [dispatch, cart]);

	return loaded && (<>{products.map((product, i) => (product.name))}</>);
};

export default CheckoutForm;
