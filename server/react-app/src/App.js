import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckoutForm from "./components/CheckoutForm";
import CategoryFeed from "./components/CategoryFeed"
import SplashPage from "./components/SplashPage";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import ProductView from "./components/ProductView";
import ProfilePage from "./components/ProfilePage";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

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
					<ProtectedRoute exact={true} path="/category/:category">
						<CategoryFeed />
					</ProtectedRoute>
					<ProtectedRoute path="/search/:term" exact={true}>
						<SearchResults />
					</ProtectedRoute>
					<ProtectedRoute path="/shop" exact={true}>
						<Feed />
					</ProtectedRoute>
					<ProtectedRoute path="/checkout" exact={true}>
						<CheckoutForm />
					</ProtectedRoute>
					<Route path="/" exact={true}>
						<SplashPage />
					</Route>
					<Route path="/404" exact={true}>
						<NotFound />
					</Route>
					<Route path="*">
						<Redirect to="/404" />
					</Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		)
	);
}

export default App;
