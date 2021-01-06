const SET_USER = "setUser";
const REMOVE_USER = "removeUser";

const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

export const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

export const login = (user) => async (dispatch) => {
	const { username, password } = user;

	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			password,
		}),
	});

    let userJson = await response.json();
    if (Object.keys(userJson).includes("errors")) return;
	dispatch(setUser(userJson));
	return response;
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	dispatch(removeUser());
	return response;
};


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = Object.assign({}, state);
			newState.user = action.payload;
			return newState;
		case REMOVE_USER:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		default:
			return state;
	};
};

export default sessionReducer;
