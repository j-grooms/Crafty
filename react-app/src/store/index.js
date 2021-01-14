import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productReducer from "./product";
import favoriteReducer from "./favorite";
import cartReducer from "./cart";
import sellerReducer from "./seller";
import searchReducer from "./search";
import checkoutReducer from "./checkout";


const rootReducer = combineReducers({
	session: sessionReducer,
	seller: sellerReducer,
	products: productReducer,
	favorites: favoriteReducer,
	cart: cartReducer,
	search: searchReducer,
	checkout: checkoutReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
