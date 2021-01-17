import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getHistory } from "../../store/history";
import { getRatings } from "../../store/ratings";
import { getCart } from "../../store/cart";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import Modal from "../Modal";
import ProfileButton from "../ProfileButton";
import Searchbar from "../Searchbar";
import "./Navbar.css";

const Navbar = () => {
	const currentUser = useSelector((state) => state.session.user);
	const [login, setLogin] = useState(false);
	const [signup, setSignup] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if (currentUser) {
			dispatch(getHistory(currentUser.id));
			dispatch(getRatings(currentUser.id));
			dispatch(getCart())
		}
	}, [dispatch, currentUser]);

	return (
		<>
			<div className="navbar-main-div">
				{currentUser ? (
					<div className="navbar-widgets">
						<NavLink to="/shop" className="navbar-logo">
							Crafty
						</NavLink>
						<Searchbar />
						<div className="nav-control-buttons">
							<ProfileButton />
							<Link to="/checkout">
								<i className="fas fa-shopping-cart cart-icon"></i>
							</Link>
						</div>
					</div>
				) : (
					<div className="navbar-widgets">
						<p className="navbar-logo">Crafty</p>
					</div>
				)}
			</div>
			{currentUser ? (
				<div className="navbar-category-container">
					<div className="navbar-categories">
						<NavLink to="">Clothing</NavLink>
						<NavLink to="">Jewelry</NavLink>
						<NavLink to="">Home & Bath</NavLink>
					</div>
				</div>
			) : (
				<>
					<div className="navbar-category-container">
						<div className="navbar-categories">
							<button onClick={() => setLogin(true)}>Have an Account?</button>
							<button onClick={() => setSignup(true)}>New User?</button>
						</div>
					</div>
					<Modal open={login} onClose={() => setLogin(false)}>
						<LoginForm onClose={() => setLogin(false)} />
					</Modal>
					<Modal open={signup} onClose={() => setSignup(false)}>
						<SignupForm onClose={() => setLogin(false)} />
					</Modal>
				</>
			)}
		</>
	);
};

export default Navbar;
