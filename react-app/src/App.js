import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";

function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, []);

	return (
		loaded && (
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route path="/login" exact={true}>
						<LoginForm />
					</Route>
					<Route path="/create-product" exact={true}>
						<ProductForm />
					</Route>
				</Switch>
			</BrowserRouter>
		)
	);
}

export default App;
