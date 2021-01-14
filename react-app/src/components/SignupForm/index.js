import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/session";

const SignupForm = () => {
	const currentUser = useSelector((state) => state.session.user);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [bio, setBio] = useState("");
	const [email, setEmail] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [profileName, setProfileName] = useState("Profile Picture");
	const [bannerName, setBannerName] = useState("Banner Picture")
	const [bannerPic, setBannerPic] = useState("");
	const [money, setMoney] = useState(0.0);
	const dispatch = useDispatch();

	if (currentUser) return <Redirect to="/shop" />;

	const handleBanner = (e) => {
		const file = e.target.files[0];
		setBannerName(file.name)
		setBannerPic(file);
	};

	const handleProfile = (e) => {
		const file = e.target.files[0];
		console.log(file.name)
		setProfileName(file.name)
		setProfilePic(file);
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
		}

		if (bannerPic) {
			const data = new FormData();
			data.append("file", bannerPic);
			const response = await fetch("/api/store/upload", {
				method: "POST",
				body: data,
			});
			const resJSON = await response.json();
			formData["banner"] = resJSON.filename;
		}

		return dispatch(signup(formData));
	};

	return (
		<>
			<form
				className="signup-form"
				encType="multipart/form-data"
				onSubmit={handleSubmit}
			>
				<div className="field-holder">
					<label className="form-label" htmlFor="username">
						Username *
					</label>
					<input
						className="signup-form-input"
						required
						type="text"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="email">
						Email *
					</label>
					<input
						className="signup-form-input"
						required
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="password">
						Password *
					</label>
					<input
						className="signup-form-input"
						required
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="confirmPassword">
						Confirm Password *
					</label>
					<input
						className="signup-form-input"
						required
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					{confirmPassword && password !== confirmPassword ? (
						<p className="password-warning">Passwords do not match</p>
					) : (
						<p></p>
					)}
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="bio">
						Bio
					</label>
					<textarea
						className="form-textarea"
						name="bio"
						placeholder="Tell us about yourself, or your products!"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
				</div>
				<div className="field-holder">
					<label className="form-label" htmlFor="money">
						Money (fake, but free!)
					</label>
					<input
						className="signup-form-input"
						type="number"
						step="any"
						value={money}
						onChange={(e) => setMoney(e.target.value)}
					/>
				</div>
				{/* <div className="form-image-holder">
					{profilePic ? (
						<img className="form-image-preview" src={profileUrl} alt="userPhoto" />
					) : (
						<div></div>
					)}
				</div> */}
				<div className="form-upload-div">
					<p>{profileName}</p>
					<label htmlFor="upload" className="upload-choice">
						Select<span className="login-spacer"></span><i class="far fa-folder-open"></i>
					</label>
					<input
						id="upload"
						type="file"
						name="profilePic"
						onChange={handleProfile}
					/>
				</div>
				{/* <div className="form-image-holder">
					{bannerPic ? (
						<img className="form-image-preview" src={bannerUrl} alt="userPhoto" />
					) : (
						<div></div>
					)}
				</div> */}
				<div className="form-upload-div">
					<p>{bannerName}</p>
					<label htmlFor="bannerPic" className="upload-choice">
						Select<span className="login-spacer"></span><i class="far fa-folder-open"></i>
					</label>
					<input
						// id="upload"
						type="file"
						id="bannerPic"
						onChange={handleBanner}
					/>
				</div>
				<div>
					<button className="login-button" type="submit">
						Sign up<span className="login-spacer"></span>
						<i class="fas fa-arrow-circle-right"></i>
					</button>
				</div>
			</form>
		</>
	);
};

export default SignupForm;
