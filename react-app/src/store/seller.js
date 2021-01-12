const SET_SELLER = "setSeller";

const setSeller = (seller) => {
    return {
        type: SET_SELLER,
        payload: seller,
    };
};

export const getSeller = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`);
    const resJSON = await response.json();
    dispatch(setSeller(resJSON.user));
    return response;
};

const initialState = {seller: {}}

const sellerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_SELLER:
            newState = Object.assign({}, state);
            newState.seller = action.payload;
            return newState;
        default:
            return state;
    };
};

export default sellerReducer;
