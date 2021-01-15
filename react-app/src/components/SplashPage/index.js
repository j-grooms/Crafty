import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import "./SplashPage.css";

const SplashPage = () => {
	const currentUser = useSelector((state) => state.session.user);

	if (currentUser) return <Redirect to="/shop" />;

	return (
		<div className="splash-background">
			<div className="splash-about">
				<p className="splash-title">Welcome to Crafty</p>
				<div className="splash-blurbs">
					<p className="blurb">Find the Perfect Gift</p>
					<p className="blurb">Support Small Business</p>
					<p className="blurb">Ship Anywhere</p>
				</div>
				<div className="splash-icons">
					<i className="fas fa-gift"></i>
					<i className="fas fa-wallet"></i>
					<i className="fas fa-truck-moving"></i>
					<i className="fas fa-store"></i>
				</div>
			</div>
		</div>
	);
};

export default SplashPage;
