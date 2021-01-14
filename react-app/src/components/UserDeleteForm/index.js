import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/session";

const UserDeleteForm = () => {
	const currentUser = useSelector((state) => state.session.user);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = { username, password };
		await dispatch(deleteUser(formData, currentUser.id));
		return history.push("/signup");
	};

	return (
		<form className="deletion-form" onSubmit={handleSubmit}>
			<div className="warning-div">
				<p className="warning-header">WARNING</p>
				<p className="warning-text">
					This will delete your account, as well as all product listings and
					reviews
				</p>
			</div>
			<div>
				<label className="form-label" htmlFor="username">Username</label>
				<input
					className="warning-input"
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label className="form-label" htmlFor="password">Password</label>
				<input
					className="warning-input"
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div>
				<button className="warning-button" type="submit">Delete Account</button>
			</div>
		</form>
	);
};

export default UserDeleteForm;
