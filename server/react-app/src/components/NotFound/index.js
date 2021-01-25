import { useHistory } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
	const history = useHistory();
	return (
		<>
			<div className="not-found-container">
				<p className="not-found-text">
					Sorry, we couldn't find the requested page!
				</p>
				<button className="login-button" onClick={() => history.push("/shop")}>
					Back to Shop
				</button>
			</div>
		</>
	);
};

export default NotFound;
