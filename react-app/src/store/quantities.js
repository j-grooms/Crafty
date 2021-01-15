const SET_QUANTITY = "setQuantities"
const RESET = "resetQuantities"

const setQuantity = (item, quantity) => {
    return {
        type: SET_QUANTITY,
        payload: {item, quantity},
    };
};

const reset = () => {
    return {type: RESET}
}

export const updateQuantity = (item, quantity) => async (dispatch) => {
    dispatch(setQuantity(item, quantity))
};

export const resetQuantity = () => async (dispatch) => {
    dispatch(reset())
}

const initialState = {}

const quantityReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_QUANTITY:
            newState = Object.assign({}, state);
            newState[action.payload.item] = action.payload.quantity;
            return newState;
        case RESET:
            return initialState;
        default:
            return state;
    };
};

export default quantityReducer;
