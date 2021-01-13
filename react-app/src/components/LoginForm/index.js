import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "../../forms.css"

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const currentUser = useSelector((state) => state.session.user);

	const dispatch = useDispatch();

	useEffect(() => {}, [currentUser]);

	const handleLogin = async (event) => {
		event.preventDefault();
		const body = { username, password };
		await dispatch(sessionActions.login(body));
	};

	if (currentUser) return <Redirect to="/shop" />;

	return (
		<>
			<form className="login-form" onSubmit={handleLogin}>
				<div className="field-holder">
					<label className="form-label" htmlFor="username">
						Username
					</label>
					<input
						className="form-input"
						type="text"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="password">
						Password
					</label>
					<input
						className="form-input"
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>

				<button className="login-button" type="submit">Login</button>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
