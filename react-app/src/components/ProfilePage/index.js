import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSeller } from "../../store/seller";
import { fetchAllProductsBySeller } from "../../store/product";
import FollowButton from "../FollowButton";
import ProductPreview from "../ProductPreview";
import "./ProfilePage.css";

const ProfilePage = () => {
	const currentUser = useSelector((state) => state.session.user);
	const seller = useSelector((state) => state.seller.seller);
	const products = useSelector((state) => state.products.products);
	const isSeller = currentUser.id === seller.id;
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			await dispatch(fetchAllProductsBySeller(id));
			await dispatch(getSeller(id));
			return setLoaded(true);
		})();
	}, [id, dispatch]);

	return (
		loaded && (
			<>
				<div className="profile-banner-container">
					<img
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
									<Link to={`/user/edit/${currentUser.id}`}>Edit Info</Link>
								</>
							) : (
								<FollowButton seller={seller.id} />
							)}
						</div>
						<div className="profile-info-container">
							<p className="profile-info-header">About this user</p>
							<p className="profile-bio">{seller.bio}</p>
						</div>
					</div>
					<div className="profile-products-grid-div">
						<div className="profile-products-container">
							{products.map((product, i) => (
								<ProductPreview
									key={product.name.concat(i)}
									product={product}
								/>
							))}
						</div>
					</div>
				</div>
			</>
		)
	);
};

export default ProfilePage;
