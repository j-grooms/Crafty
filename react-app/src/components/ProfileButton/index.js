import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import Modal from "../Modal";
import UserDeleteForm from "../UserDeleteForm";
import "./ProfileButton.css";

const ProfileButton = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = () => dispatch(sessionActions.logout());

	return (
		<div className="nav-holder">
			<div className="nav-user-icon" onClick={openMenu}>
				<img
					className="nav-user-image"
					src={`https://crafty-app.s3.us-east-2.amazonaws.com/${currentUser.profile_pic}`}
					alt="profile"
				/>
			</div>
			{showMenu && (
				<div className="profile-button-dropdown">
					<Link className="profile-dropdown-links" to="/create-product">
						List a Product
					</Link>
					<Link
						className="profile-dropdown-links"
						to={`/user/${currentUser.id}`}
					>
						Your Profile
					</Link>
					<button
						className="profile-dropdown-links"
						onClick={() => setDeleting(true)}
					>
						Delete Profile
					</button>
					<button className="profile-dropdown-links" onClick={logout}>
						Log Out
					</button>
				</div>
			)}
			<Modal open={deleting} onClose={() => setDeleting(false)}>
				<UserDeleteForm />
			</Modal>
		</div>
	);
};

export default ProfileButton;
