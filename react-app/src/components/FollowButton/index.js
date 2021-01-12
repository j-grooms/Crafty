import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { follow, unfollow } from "../../store/session";
import { getSeller } from "../../store/seller"

const FollowButton = (props) => {
	const currentFollowList = useSelector(
		(state) => state.session.user.following
	);
	const currentUserId = useSelector((state) => state.session.user.id);
	const sellerId = useSelector((state) => state.seller.seller.id);
	const [isFollowing, setIsFollowing] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(getSeller(props.seller));
			for (let i = 0; i < currentFollowList.length; i++) {
				if (currentFollowList[i].id === sellerId) {
					await setIsFollowing(true);
				}
			}
			await setLoaded(true);
		})();
	}, [sellerId, currentFollowList, props.seller, dispatch]);

	const handleFollow = async () => {
		if (isFollowing) {
			await dispatch(unfollow(sellerId, currentUserId));
			return setIsFollowing(false);
		} else {
			await setIsFollowing(true);
			return dispatch(follow(sellerId, currentUserId));
		}
	};

	return (
		loaded && (
			<>
				{isFollowing ? (
					<button onClick={handleFollow}>Unfollow</button>
				) : (
					<button onClick={handleFollow}>Follow</button>
				)}
			</>
		)
	);
};

export default FollowButton;
