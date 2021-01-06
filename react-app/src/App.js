import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { authenticate } from "./services/auth";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";

function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			const user = await authenticate();
			if (!user.errors) {
				setAuthenticated(true);
			}
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
