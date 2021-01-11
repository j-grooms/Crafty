import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import "./index.css";
// import "./reset.css"
import App from "./App";

const preloadedState = {
	products: {product: {id: null}, products: null}
}

const store = configureStore(preloadedState);

function Root() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);
