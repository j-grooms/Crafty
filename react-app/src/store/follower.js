const SET_FOLLOWERS = "setFollowers"

const setFollowing = (following) => {
    return {
        type: SET_FOLLOWERS,
        payload: following,
    };
};

export const isFollowing = (userId, currentUserId) => async (dispatch) => {
    const response = await fetch(`/api/users/`)
};

const initialState = {following: null}

const followingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_FOLLOWERS:
            newState = Object.assign({}, state);
            newState.followers = action.payload;

    };
};
