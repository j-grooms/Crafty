const SET_RESULTS = "setResults";

const setResults = (results) => {
    return {
        type: SET_RESULTS,
        payload: results,
    };
};

export const searchByTag = (tag) => async (dispatch) => {
    const response = await fetch(`/api/products/by_tag/${tag}`)
}

const initialState = { results: [] };

const resultsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_RESULTS:
            newState = Object.assign({}, state);
            newState.results = action.payload;
            return newState;
        default:
            return state;
    };
};

export default resultsReducer;
