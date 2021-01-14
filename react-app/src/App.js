import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckoutForm from "./components/CheckoutForm";
import SplashPage from "./components/SplashPage";
import UserEditForm from "./components/UserEditForm";
import UserDeleteForm from "./components/UserDeleteForm";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import ProductForm from "./components/ProductForm";
import ProductView from "./components/ProductView";
import ProductEditForm from "./components/ProductEditForm";
import ProductDeleteForm from "./components/ProductDeleteForm";
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
					<ProtectedRoute exact={true} path="/product/edit/:id">
						<ProductEditForm />
					</ProtectedRoute>
					<ProtectedRoute exact={true} path="/user/:id">
						<ProfilePage />
					</ProtectedRoute>
					<ProtectedRoute exact={true} path="/user/edit/:id">
						<UserEditForm />
					</ProtectedRoute>
					<ProtectedRoute exact={true} path="/user/delete/:id">
						<UserDeleteForm />
					</ProtectedRoute>
					<ProtectedRoute exact={true} path="/product/delete/:id">
						<ProductDeleteForm />
					</ProtectedRoute>
					<ProtectedRoute exact={true} path="/product/:id">
						<ProductView />
					</ProtectedRoute>
					<ProtectedRoute path="/create-product" exact={true}>
						<ProductForm />
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
