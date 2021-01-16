const GET_RATINGS = "getRatings";

const setRatings = (ratings) => {
	return {
		type: GET_RATINGS,
		payload: ratings,
	};
};

export const getRatings = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/ratings`)
    const resJSON = await response.json();
    dispatch(setRatings(resJSON.ratings));
    return response;
};

const initialState = { reviews: [] };

const ratingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_RATINGS:
            newState = Object.assign({}, state);
            newState.reviews = action.payload;
            return newState;
        default:
            return state;
    };
};

export default ratingsReducer;
