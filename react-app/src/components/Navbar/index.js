import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './Navbar.css'

const Navbar = () => {
	const currentUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const logout = () => dispatch(sessionActions.logout());

	return (
		<div>
			<div>
				{currentUser ? (
					<div className="nav-link-container">
						<NavLink to="/shop">Home</NavLink>
						<NavLink to="/create-product">List a Product</NavLink>
						<button onClick={logout}>Log Out</button>
					</div>
				) : (
					<>
						<NavLink to="/login">Login</NavLink>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
