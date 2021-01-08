import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/session";

const UserEditForm = () => {
    const currentUser = useSelector((state) => state.session.user);
    const [password, setPassword] = useState("");
	const [bio, setBio] = useState(currentUser.bio);
	const [money, setMoney] = useState(currentUser.money);
	const [profilePic, setProfilePic] = useState("");
	const [profileUrl, setProfileUrl] = useState("");
	const [bannerPic, setBannerPic] = useState("");
	const [bannerUrl, setBannerUrl] = useState("");
	const dispatch = useDispatch();

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
        return <Redirect to="/shop" />
	};

	return (
		<>
			<form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                    <p>For security, enter your CURRENT password below:</p>
                    <label htmlFor="password">Password *</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                <p>Add some funds!</p>
				<div>
					<label htmlFor="money">Money</label>
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
                <p>To keep your current photos, just leave these fields blank</p>
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
					<button type="submit">Save Changes</button>
				</div>
			</form>
		</>
	);
};

export default UserEditForm;
