import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/session";

const UserEditForm = ({ onClose }) => {
    const currentUser = useSelector((state) => state.session.user);
    const [password, setPassword] = useState("");
	const [bio, setBio] = useState(currentUser.bio);
	const [money, setMoney] = useState(currentUser.money);
	const [profilePic, setProfilePic] = useState("");
	const [profile, setProfile] = useState("Profile Picture");
	const [bannerPic, setBannerPic] = useState("");
	const [banner, setBanner] = useState("Banner Picture");
    const dispatch = useDispatch();

	const handleBanner = (e) => {
		const file = e.target.files[0];
		setBannerPic(file);
		setBanner(file.name)
	};

	const handleProfile = (e) => {
		const file = e.target.files[0];
		setProfilePic(file);
		setProfile(file.name)
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = {
            username: currentUser.username,
            password,
			profile_pic: currentUser.profile_pic,
			banner: currentUser.banner,
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

        await dispatch(updateUser(formData, currentUser.id));
		onClose();
		return
	};

	return (
		<>
			<form className="signup-form" encType="multipart/form-data" onSubmit={handleSubmit}>
				<div className="field-holder">
					<label htmlFor="password" className="form-label">
						Password *
					</label>
					<input
						required
						className="signup-form-input"
						type="password"
						name="password"
						placeholder="Current password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="field-holder">
					<label htmlFor="bio" className="form-label">
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
					<label htmlFor="money" className="form-label">
						Money (always free)
					</label>
					<input
						className="signup-form-input"
						type="number"
						step="any"
						value={money}
						onChange={(e) => setMoney(e.target.value)}
					/>
				</div>
				<p className="user-edit-instruction">To keep your current photos, just leave these fields blank</p>
				<div className="form-upload-div">
					<p>{profile}</p>
					<label htmlFor="profilePic" className="upload-choice">
						Select<span className="login-spacer"></span>
						<i className="far fa-folder-open"></i>
					</label>
					<input type="file" id="profilePic" onChange={handleProfile} />
				</div>
				<div className="form-upload-div">
					<p>{banner}</p>
					<label htmlFor="bannerPic" className="upload-choice">
						Select <span className="login-spacer"></span>
						<i className="far fa-folder-open"></i>
					</label>
					<input type="file" id="bannerPic" onChange={handleBanner} />
				</div>
				<div>
					<button className="login-button" type="submit">
						Save <span className="login-spacer"></span>
						<i className="fas fa-arrow-circle-right"></i>
					</button>
				</div>
			</form>
		</>
	);
};

export default UserEditForm;
