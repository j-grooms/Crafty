const SET_PRODUCT = "setProduct"
const ALL_PRODUCTS = "allProducts"

const setProduct = (product) => {
    return {
        type: SET_PRODUCT,
        payload: product
    }
};

const setProducts = (products) => {
    return {
        type: ALL_PRODUCTS,
        payload: products
    };
};

export const createProduct = (product) => async (dispatch) => {
    const response = await fetch(`/api/products/`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    });

    const resJSON = await response.json();

    dispatch(setProduct(resJSON.product))
};

export const fetchAllProducts = () => async (dispatch) => {
    const response = await fetch(`/api/products/all`)
    const resJSON = await response.json();
    dispatch(setProducts(resJSON.products));
    return response;
};

const initialState = { product: null, products: null };

const productReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_PRODUCT:
            newState = Object.assign({}, state);
            newState.product = action.payload
            return newState;
		case ALL_PRODUCTS:
            newState = Object.assign({}, state);
            newState.products = action.payload
            return newState;
		default:
			return state;
	}
};

export default productReducer;
