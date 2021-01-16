import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckoutForm from "./components/CheckoutForm";
import SplashPage from "./components/SplashPage";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import ProductView from "./components/ProductView";
import ProfilePage from "./components/ProfilePage";
import SearchResults from "./components/SearchResults";

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
					<ProtectedRoute exact={true} path="/user/:id">
						<ProfilePage />
					</ProtectedRoute>
					<ProtectedRoute exact={true} path="/product/:id">
						<ProductView />
					</ProtectedRoute>
					<ProtectedRoute path="/search/:term" exact={true}>
						<SearchResults />
					</ProtectedRoute>
					<ProtectedRoute path="/shop" exact={true}>
						<Feed />
					</ProtectedRoute>
					<Route path="/" exact={true}>
						<SplashPage />
					</Route>
					<ProtectedRoute path="/checkout" exact={true}>
						<CheckoutForm />
					</ProtectedRoute>
					<Route path="/test">
						<p>test</p>
					</Route>
					<Route path="/404" exact={true}>
						<p>404</p>
					</Route>
					<Route path="*">
						<Redirect to='/404' />
					</Route>
				</Switch>
			</BrowserRouter>
		)
	);
}

export default App;
