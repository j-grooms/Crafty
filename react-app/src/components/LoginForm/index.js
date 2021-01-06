import React, { useState } from "react";
import { useDispatch } from "react-redux"
import * as sessionActions from '../../store/session'

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

    const dispatch = useDispatch();

	const handleLogin = (event) => {
		event.preventDefault();
		const body = { username, password };
        console.log(body);
        return dispatch(sessionActions.login(body))
	};

	const handleUsername = (e) => setUsername(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	return (
		<>
			<form onSubmit={handleLogin}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					value={username}
					onChange={handleUsername}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={handlePassword}
				/>
                <button type="submit">Login</button>
			</form>
		</>
	);
};

export default LoginForm;
