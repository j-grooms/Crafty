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

    if (currentUser) return <Redirect to='/shop' />

    return (
        <p>Test</p>
    )
};

export default SignupForm;
