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

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	const resJSON = await response.json();
	if (Object.keys(resJSON).includes("errors")) return response;
	dispatch(setUser(resJSON));
	return response;
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
	if (Object.keys(userJson).includes("errors")) return response;
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

export const signup = (user) => async (dispatch) => {
	const response = await fetch(`/api/auth/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	});
	const resJSON = await response.json();
	if (Object.keys(resJSON).includes("errors")) return response;
	dispatch(setUser(resJSON.user));
	return response;
};

export const updateUser = (formData, userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/edit`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	});
	const resJSON = await response.json();
	if (Object.keys(resJSON).includes("errors")) return response;
	dispatch(setUser(resJSON.user));
	return response;
};

export const deleteUser = (formData, userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/delete`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	});
	const resJSON = await response.json();
	if (Object.keys(resJSON).includes("errors")) return response;
	dispatch(removeUser());
	return response;
};

export const addFavorite = (productId, userId) => async (dispatch) => {
	const response = await fetch(
		`/api/users/${userId}/favorites/add/${productId}`,
		{ method: "POST" }
	);
	const resJSON = await response.json();
	dispatch(setUser(resJSON.user));
	return response;
};

export const removeFavorite = (productId, userId) => async (dispatch) => {
	const response = await fetch(
		`/api/users/${userId}/favorites/remove/${productId}`,
		{ method: "POST" }
	);
	const resJSON = await response.json();
	dispatch(setUser(resJSON.user));
	return response;
};

export const follow = (sellerId, currentUserId) => async (dispatch) => {
	const response = await fetch(
		`/api/users/${currentUserId}/follow/${sellerId}`,
		{ method: "POST" }
	);
	const resJSON = await response.json();
	dispatch(setUser(resJSON.user));
	return response;
};

export const unfollow = (sellerId, currentUserId) => async (dispatch) => {
	const response = await fetch(
		`/api/users/${currentUserId}/unfollow/${sellerId}`,
		{ method: "POST" }
	);
	const resJSON = await response.json();
	dispatch(setUser(resJSON.user));
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
	}
};

export default sessionReducer;
