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

export const getProductById = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`);
    const resJSON = await response.json();
    dispatch(setProduct(resJSON.products));
    return response;
};

export const fetchAllProducts = () => async (dispatch) => {
    const response = await fetch(`/api/products/all`)
    const resJSON = await response.json();
    dispatch(setProducts(resJSON.products));
    return response;
};

export const fetchAllProductsBySeller = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/by_user/${id}`);
    const resJSON = await response.json();
    dispatch(setProducts(resJSON.products));
    return response;
};

export const editProduct = (product, productId) => async (dispatch) => {
    const response = await fetch(`/api/products/edit/${productId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
    const resJSON = await response.json();
    dispatch(setProduct(resJSON.product))
    return response;
};

export const deleteProduct = (formData, productId) => async (dispatch) => {
    const response = await fetch(`/api/products/delete/${productId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData)
    });
    dispatch(setProduct({ id: null, user: { id: null } }));
    return response;
};

export const rateProduct = (productId ,formData) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/rate`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData),
    });
    const resJSON = await response.json();
    dispatch(setProduct(resJSON.product));
    return response;
};

const initialState = { product: {id: null, user: {id: null}}, products: null };

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
