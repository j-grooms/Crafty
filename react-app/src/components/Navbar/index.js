import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'

const Navbar = () => {
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()

    const logout = () => dispatch(sessionActions.logout())

	return (
		<div>
			{currentUser ? (
				<>
					<NavLink to="/shop">Home</NavLink>
                    <NavLink to="/create-product">List a Product</NavLink>
                    <button onClick={logout}>Log Out</button>
				</>
			) : (
				<>
					<NavLink to="/login">Login</NavLink>
				</>
			)}
		</div>
	);
};

export default Navbar;
