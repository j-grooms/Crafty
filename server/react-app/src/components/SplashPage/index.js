import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import Modal from "../Modal";

import "./SplashPage.css";

const SplashPage = () => {
	const currentUser = useSelector((state) => state.session.user);
	const [login, setLogin] = useState(false);
	const [signup, setSignup] = useState(false);

	if (currentUser) return <Redirect to="/shop" />;

	return (
		<div className="splash-container">
			<div className="splash-background">
				<div className="splash-about">
					<p className="splash-title">Welcome to Crafty</p>
					<div className="splash-blurbs">
						<p className="blurb">Find the Perfect Gift</p>
						<p className="blurb">Support Small Business</p>
						<p className="blurb">Ship Anywhere</p>
					</div>
				</div>
				<div className="splash-selections">
					<button className="login-button" onClick={() => setLogin(true)}>
						Log In
					</button>
					<p>OR</p>
					<button className="login-button" onClick={() => setSignup(true)}>
						Sign Up
					</button>
				</div>
				<Modal open={login} onClose={() => setLogin(false)}>
					<LoginForm onClose={() => setLogin(false)} />
				</Modal>
				<Modal open={signup} onClose={() => setSignup(false)}>
					<SignupForm onClose={() => setSignup(false)} />
				</Modal>
			</div>
			<div className="splash-icons">
				<i className="fas fa-gift"></i>
				<i className="fas fa-wallet"></i>
				<i className="fas fa-truck-moving"></i>
				<i className="fas fa-store"></i>
			</div>
		</div>
	);
};

export default SplashPage;
