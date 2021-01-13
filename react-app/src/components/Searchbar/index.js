import { useState } from "react";
import "./Searchbar.css";

const Searchbar = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const submitSearch = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<div className="searchbar-container">
				<div className="searchbar-border">
					<form onSubmit={submitSearch} className="searchbar-form">
						<input
							className="searchbar-input"
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search for tags"
						/>
						<button className="searchbar-submit-button" type="submit">
							<i className="fas fa-search"></i>
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Searchbar;
