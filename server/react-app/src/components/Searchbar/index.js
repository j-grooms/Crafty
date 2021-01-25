import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Searchbar.css";

const Searchbar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const history = useHistory();

	const submitSearch = async(event) => {
		event.preventDefault();
		if (searchTerm === "") return history.push(`/search/all`)
		return history.push(`/search/${searchTerm}`)
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
