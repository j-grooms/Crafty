const SET_QUANTITY = "setQuantities"

const setQuantity = (item, quantity) => {
    return {
        type: SET_QUANTITY,
        payload: {item, quantity},
    };
};

export const updateQuantity = (item, quantity) => async (dispatch) => {
    dispatch(setQuantity(item, quantity))
};

const initialState = {}

const quantityReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_QUANTITY:
            newState = Object.assign({}, state);
            newState[action.payload.item] = action.payload.quantity;
            return newState;
        default:
            return state;
    };
};

export default quantityReducer;
