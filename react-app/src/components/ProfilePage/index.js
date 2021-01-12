import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSeller } from "../../store/seller";
import FollowButton from "../FollowButton"
import "./ProfilePage.css";

const ProfilePage = () => {
	const currentUser = useSelector((state) => state.session.user);
	const seller = useSelector((state) => state.seller.seller);
	const isSeller = currentUser.id === seller.id;
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			await dispatch(getSeller(id));
			return setLoaded(true);
		})();
	}, [id, dispatch]);

	return (
		loaded && (
			<>
				<p>NAME: {seller.username}</p>
				{currentUser.id===seller.id ? <></> : <FollowButton seller={seller.id} />}
			</>
		)
	);
};

export default ProfilePage;
