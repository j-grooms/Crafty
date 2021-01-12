import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "../ProfileButton";
import Searchbar from "../Searchbar";
import "./Navbar.css";

const Navbar = () => {
	const currentUser = useSelector((state) => state.session.user);

	return (
		<div className="navbar-main-div">
			<div>
				{currentUser ? (
					<div className="nav-link-right">
						<NavLink to="/shop" className="navbar-logo">Crafty</NavLink>
						<Searchbar />
						<div className="nav-control-buttons">
							<ProfileButton />
							<i className="fas fa-shopping-cart cart-icon"></i>
						</div>
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
