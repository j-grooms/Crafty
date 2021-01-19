const SET_CART = "setCart"

const setCart = (cart) => {
    return {
        type: SET_CART,
        payload: cart
    };
};

export const getCart = () => async (dispatch) => {
    let cart = JSON.parse(localStorage.getItem("cart"))
    if (!cart) {
        localStorage.setItem("cart", JSON.stringify([]))
        return dispatch(setCart([]))
    } else {
        return dispatch(setCart(cart))
    }

};

export const addToCart = (id) => async (dispatch) => {
    let cart = JSON.parse(localStorage.getItem("cart"))
    const newCart = [...cart, id]
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(setCart(newCart))
};

export const removeFromCart = (id) => async (dispatch) => {
    let cart = JSON.parse(localStorage.getItem("cart"))
    const newCart = cart.filter(item => item !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(setCart(newCart));
};

export const emptyCart = () => async (dispatch) => {
    const newCart = [];
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(setCart(newCart));
};

const initialState = {cart: []}

const cartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_CART:
            newState = Object.assign({}, state);
            newState.cart = action.payload;
            return newState;
        default:
            return state;
    };
};

export default cartReducer;
