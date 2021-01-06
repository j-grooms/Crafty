import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./services/auth";

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
			<Switch>
				<Route path="/" exact={true}>
					<LoginForm />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
