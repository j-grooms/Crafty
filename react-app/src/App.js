import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import Feed from "./components/Feed";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	return (
		loaded && (
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route path="/login" exact={true}>
						<LoginForm />
					</Route>
					<ProtectedRoute path="/create-product" exact={true}>
						<ProductForm />
					</ProtectedRoute>
					<ProtectedRoute path="/shop" exact={true}>
						<Feed />
					</ProtectedRoute>
				</Switch>
			</BrowserRouter>
		)
	);
}

export default App;
