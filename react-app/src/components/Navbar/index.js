import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './Navbar.css'

const Navbar = () => {
	const currentUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const logout = () => dispatch(sessionActions.logout());
	const editProfile = () => history.push(`/user/edit/${currentUser.id}`)

	return (
		<div>
			<div>
				{currentUser ? (
					<div className="nav-link-container">
						<NavLink to="/shop">Home</NavLink>
						<NavLink to="/create-product">List a Product</NavLink>
						<button onClick={logout}>Log Out</button>
						<button onClick={editProfile}>Edit Profile</button>
					</div>
				) : (
					<div className="nav-link-container">
						<NavLink to="/login">Login</NavLink>
						<NavLink to="/signup">Sign Up</NavLink>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
