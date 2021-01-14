import { useState } from "react";
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
					<i class="fas fa-gift"></i>
					<i class="fas fa-wallet"></i>
					<i class="fas fa-truck-moving"></i>
					<i class="fas fa-store"></i>
				</div>
			</div>
		</div>
	);
};

export default SplashPage;
