import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import Feed from "./components/Feed";
import ProductView from "./components/ProductView";
import ProductEditForm from "./components/ProductEditForm";

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
					<ProtectedRoute exact={true} path="/product/edit/:id">
						<ProductEditForm />
						{/* <p>Test</p> */}
					</ProtectedRoute>
					<ProtectedRoute exact={true} path="/product/:id">
						<ProductView />
					</ProtectedRoute>
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
