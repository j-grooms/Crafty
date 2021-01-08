import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SignupForm = () => {
	const currentUser = useSelector((state) => state.session.user);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [bio, setBio] = useState("");
	const [email, setEmail] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [profileUrl, setProfileUrl] = useState("");
	const [bannerPic, setBannerPic] = useState("");
	const [bannerUrl, setBannerUrl] = useState("");
	const [money, setMoney] = useState(0);

	if (currentUser) return <Redirect to="/shop" />;

	const handleBanner = (e) => {
		const file = e.target.files[0];
		const fileReader = new FileReader();
		setBannerPic(file);
		console.log(bannerPic);
		if (file) {
			fileReader.readAsDataURL(file);
			fileReader.onloadend = () => {
				setBannerUrl(fileReader.result);
			};
		}
	};

	const handleProfile = (e) => {
		const file = e.target.files[0];
		const fileReader = new FileReader();
		setProfilePic(file);
		console.log(profilePic);
		if (file) {
			fileReader.readAsDataURL(file);
			fileReader.onloadend = () => {
				setProfileUrl(fileReader.result);
			};
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
	};

	return (
		<>
			<form enctype="multipart/form-data">
				<div>
					<label htmlFor="username">Username</label>
					<input
						required
						type="text"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						required
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						required
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						required
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="bio">Bio</label>
					<textarea
						name="bio"
						placeholder="Tell us about yourself, or your products!"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="money">Money (fake, but free!)</label>
					<input
						type="number"
						step="any"
						value={money}
						onChange={(e) => setMoney(e.target.value)}
					/>
				</div>
			</form>
		</>
	);
};

export default SignupForm;
