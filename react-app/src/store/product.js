const SET_PRODUCT = "setProduct"

const setProduct = (product) => {
    return {
        type: SET_PRODUCT,
        payload: product
    }
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

const initialState = { product: null, products: null };

const productReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_PRODUCT:
            newState = Object.assign({}, state);
            newState.product = action.payload
            return newState;
		default:
			return state;
	}
};

export default productReducer;
