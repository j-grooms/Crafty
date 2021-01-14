import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import Modal from "../Modal";
import "./SplashPage.css";

const SplashPage = () => {
	const [login, setLogin] = useState(false);
	const [signup, setSignup] = useState(false);
	const currentUser = useSelector((state) => state.session.user);

	if (currentUser) return <Redirect to="/shop" />;

	return (
		<div className="splash-background">
			<div className="forms-holder">
				<button className="splash-option" onClick={() => setLogin(true)}>
					Have an Account?
				</button>
				<button className="splash-option" onClick={() => setSignup(true)}>
					New User?
				</button>
				<Modal open={login} onClose={() => setLogin(false)}>
					<LoginForm />
				</Modal>
				<Modal open={signup} onClose={() => setSignup(false)}>
					<SignupForm />
				</Modal>
			</div>
			<div className="splash-about">
				<p>Welcome to Crafty</p>
			</div>
		</div>
	);
};

export default SplashPage;
