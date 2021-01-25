const GET_CART_ITEMS = "getCartItems";

const setItems = (items) => {
	return {
		type: GET_CART_ITEMS,
		payload: items,
	};
};

export const getCartItems = (items) => async (dispatch) => {
	const response = await fetch(`/api/store/cart/items`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(items),
    });
    const resJSON = await response.json();
    dispatch(setItems(resJSON.products));
    return response;
};

export const checkout = (body) => async (dispatch) => {
    const response = await fetch(`/api/store/checkout`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
    });
    // const resJSON = await response.json();
    return response;
};

const initialState = { products: [] };

const checkoutReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CART_ITEMS:
            newState = Object.assign({}, state);
            newState.products = action.payload;
            return newState;
        default:
            return state;
    };
};

export default checkoutReducer;
