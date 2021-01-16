const GET_HISTORY = "getHistory";

const setHistory = (history) => {
	return {
		type: GET_HISTORY,
		payload: history,
	};
};

export const getHistory = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/history`);
    const resJSON = await response.json();
    dispatch(setHistory(resJSON.purchase_history));
    return response;
};

const initialState = { history: [] };

const historyReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_HISTORY:
            newState = Object.assign({}, state);
            newState.history = action.payload;
            return newState;
        default:
            return state;
    };
};

export default historyReducer;
