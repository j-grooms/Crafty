import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from '../../store/session'

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const currentUser = useSelector((state) => state.session.user)

	const dispatch = useDispatch();

	useEffect(() => {}, [currentUser])

	const handleLogin = async(event) => {
		event.preventDefault();
		const body = { username, password };
        console.log(body);
		await dispatch(sessionActions.login(body))

	};

	if (currentUser) return <Redirect to='/shop' />

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
