import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import ProfileButton from "../ProfileButton"
import './Navbar.css'

const Navbar = () => {
	const currentUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const logout = () => dispatch(sessionActions.logout());
	const editProfile = () => history.push(`/user/edit/${currentUser.id}`)
	const deleteProfile = () => history.push(`/user/delete/${currentUser.id}`)

	return (
		<div className="navbar-main-div">
			<div>
				{currentUser ? (
					<div className="nav-link-container">
						<NavLink to="/shop">Home</NavLink>
						<ProfileButton />
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
