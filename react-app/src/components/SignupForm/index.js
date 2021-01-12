import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../../store/session'

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
    const [money, setMoney] = useState(0.0);
    const dispatch = useDispatch();

	if (currentUser) return <Redirect to="/shop" />;

	const handleBanner = (e) => {
		const file = e.target.files[0];
		const fileReader = new FileReader();
		setBannerPic(file);
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
		if (file) {
			fileReader.readAsDataURL(file);
			fileReader.onloadend = () => {
				setProfileUrl(fileReader.result);
			};
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) return;
		const formData = {
			username,
			email,
			password,
			profile_pic: null,
			banner: null,
			money,
			bio,
		};

		if (profilePic) {
			const data = new FormData();
			data.append("file", profilePic);
			const response = await fetch("/api/store/upload", {
				method: "POST",
				body: data,
			});
			const resJSON = await response.json();
			formData["profile_pic"] = resJSON.filename;
		};

		if (bannerPic) {
			const data = new FormData();
			data.append("file", bannerPic);
			const response = await fetch("/api/store/upload", {
				method: "POST",
				body: data,
			});
			const resJSON = await response.json();
			formData["banner"] = resJSON.filename;
        };

        return dispatch(signup(formData));
	};

	return (
		<>
			<form encType="multipart/form-data" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username *</label>
					<input
						required
						type="text"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="email">Email *</label>
					<input
						required
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password *</label>
					<input
						required
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password *</label>
					<input
						required
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					{confirmPassword && password !== confirmPassword ? (
						<p>Warning: Passwords do not match</p>
					) : (
						<></>
					)}
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
				<div>
					{profilePic ? (
						<img className="user-image" src={profileUrl} alt="userPhoto" />
					) : (
						<></>
					)}
				</div>
				<div>
					<label htmlFor="profilePic">Profile Picture</label>
					<input type="file" name="profilePic" onChange={handleProfile} />
				</div>
				<div>
					{bannerPic ? (
						<img className="user-image" src={bannerUrl} alt="userPhoto" />
					) : (
						<></>
					)}
				</div>
				<div>
					<label htmlFor="bannerPic">Profile Banner</label>
					<input type="file" name="bannerPic" onChange={handleBanner} />
				</div>
				<div>
					<button type="submit">Sign me up!</button>
				</div>
			</form>
		</>
	);
};

export default SignupForm;
