import "./Footer.css"

const Footer = () => {
	return (
		<div className="footer-div">
			<div className="footer-name">
				<p>© 2021 Jacob Grooms</p>
			</div>
			<div className="footer-links">
				<a href="https://github.com/j-grooms/Crafty">
					<i className="fab fa-github"></i>
				</a>
				<a href="https://angel.co/u/jacob-grooms">
					<i className="fab fa-angellist"></i>
				</a>
				<a href="https://www.linkedin.com/in/jacob-grooms/">
					<i className="fab fa-linkedin"></i>
				</a>
			</div>
		</div>
	);
};

export default Footer;
