import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSeller } from "../../store/seller";
import { fetchAllProductsBySeller } from "../../store/product";
import { getFavorites } from "../../store/favorite";
import Modal from "../Modal";
import UserEditForm from "../UserEditForm";
import FollowButton from "../FollowButton";
import ProductPreview from "../ProductPreview";
import "./ProfilePage.css";

const ProfilePage = () => {
	const currentUser = useSelector((state) => state.session.user);
	const following = useSelector((state) => state.session.user.following);
	const seller = useSelector((state) => state.seller.seller);
	const products = useSelector((state) => state.products.products);
	const favorites = useSelector((state) => state.favorites.favorites);
	const [editing, setEditing] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const isSeller = currentUser.id === seller.id;
	const dispatch = useDispatch();

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			await dispatch(getFavorites(currentUser.id));
			await dispatch(fetchAllProductsBySeller(id));
			await dispatch(getSeller(id));
			return setLoaded(true);
		})();
	}, [id, currentUser, currentUser.id, dispatch]);

	const generateLinks = () => {
		if (!following.length) return [<p>You are not following any users!</p>];
		const links = following.map((user, index) => (
			<div className="profile-following-link-container">
				<Link
					className="profile-following-link"
					key={index}
					to={`/user/${user.id}`}
				>
					<p>{user.username}</p>
					<i className="fas fa-arrow-circle-right profile-following-link-icon"></i>
				</Link>
			</div>
		));
		return links;
	};

	return (
		loaded && (
			<>
				<div className="profile-banner-container">
					<img
						className="profile-banner"
						src={`https://crafty-app.s3.us-east-2.amazonaws.com/${seller.banner}`}
						alt="banner"
					/>
				</div>
				<div className="profile-grid-div">
					<div className="profile-user-grid-div">
						<div className="profile-avatar-container">
							<img
								className="profile-avatar"
								src={`https://crafty-app.s3.us-east-2.amazonaws.com/${seller.profile_pic}`}
								alt="avatar"
							/>
						</div>
						<div className="profile-username-container">
							<p className="profile-username">{seller.username}</p>
							{isSeller ? (
								<>
									<button
										className="login-button"
										onClick={() => setEditing(true)}
									>
										Edit Info
									</button>
									<Modal open={editing} onClose={() => setEditing(false)}>
										<UserEditForm onClose={() => setEditing(false)} />
									</Modal>
								</>
							) : (
								<FollowButton seller={seller.id} />
							)}
						</div>
						<div className="profile-info-container">
							{isSeller ? 	<div>
									<p className="profile-bio">
										Money in your wallet: ${seller.money}
									</p>
								</div> : <></>}
							<p className="profile-info-header">About this Seller</p>
							<p className="profile-bio">{seller.bio}</p>
							{isSeller ? (
								<div>
									<p className="profile-info-header">People You Follow</p>
									{generateLinks().map((link) => link)}
								</div>
							) : (
								<></>
							)}
						</div>
					</div>
					<div className="profile-products-grid-div">
						<p className="profile-products-header">
							{isSeller ? "Your Products" : "Products by this User"}
						</p>
						<div className="profile-products-container">
							{products.map((product, i) => (
								<ProductPreview
									key={product.name.concat(i)}
									product={product}
								/>
							))}
						</div>
						{isSeller ? (
							<>
								<p className="profile-products-header">Your Favorites</p>
								<div className="profile-products-container">
									{favorites.map((favorite, i) => (
										<ProductPreview
											key={favorite.product.name.concat(i)}
											product={favorite.product}
										/>
									))}
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			</>
		)
	);
};

export default ProfilePage;
