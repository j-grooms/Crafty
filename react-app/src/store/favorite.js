const SET_FAVORITE = "checkFavorite"

const setFavorites = (favorites) => {
    return {
        type: SET_FAVORITE,
        payload: favorites
    };
};

export const checkFavorite = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/favorites`);
    const resJSON = await response.json();
    dispatch(setFavorites(resJSON.favorites));
    return response
};



const initialState = { favorites: null };

const favoriteReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_FAVORITE:
			newState = Object.assign({}, state);
            newState.favorites = action.payload;
            return newState;
		default:
			return state;
	}
};

export default favoriteReducer;
