import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
// import { authenticate } from "./services/auth";
import {authenticate} from './store/session'
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";

function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch()

	useEffect(() => {
		return dispatch(authenticate());
		(async () => {
			// if (!user.errors) {
				console.log("user")
				// 	setAuthenticated(true);
				// }
				setLoaded(true);
			})();
		}, []);
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
