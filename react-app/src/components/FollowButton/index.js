import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { follow, unfollow } from "../../store/session";

const FollowButton = () => {
	const currentFollowList = useSelector(
		(state) => state.session.user.following
	);
	const currentUserId = useSelector((state) => state.session.user.id);
	const sellerId = useSelector((state) => state.products.product.user.id);
	const [isFollowing, setIsFollowing] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			for (let i = 0; i < currentFollowList.length; i++) {
				if (currentFollowList[i].id === sellerId) {
					await setIsFollowing(true);
				}
			}
			await setLoaded(true);
		})();
	}, [sellerId, currentFollowList]);

	const handleFollow = async () => {
		if (isFollowing) {
			await dispatch(follow(sellerId, currentUserId));
			return setisFollowing(false);
		} else {
			await setIsFollowing(true);
			return dispatch(unfollow(sellerId, currentUserId));
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
