const SET_FOLLOWERS = "setFollowers"

const setFollowers = (followers) => {
    return {
        type: SET_FOLLOWERS,
        payload: followers,
    };
};



const initialState = {followers: null}

const followerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_FOLLOWERS:
            newState = Object.assign({}, state);
            newState.followers = action.payload;
            
    };
};
