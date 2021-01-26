import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getHistory } from "../../store/history";
import { getRatings } from "../../store/ratings";
import { getCart } from "../../store/cart";
import ProfileButton from "../ProfileButton";
import Searchbar from "../Searchbar";
import "./Navbar.css";

const Navbar = () => {
	const currentUser = useSelector((state) => state.session.user);
	const cart = useSelector((state) => state.cart.cart);
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
								<i className="fas fa-shopping-cart cart-icon"><p className="cart-items">{cart.length}</p></i>
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
						<NavLink to="/category/Clothing">Clothing</NavLink>
						<NavLink to="/category/Jewelry">Jewelry</NavLink>
						<NavLink to="/category/Home">Home & Bath</NavLink>
					</div>
				</div>
			) : (
				<>
					<div className="navbar-category-container">
					</div>
				</>
			)}
		</>
	);
};

export default Navbar;
