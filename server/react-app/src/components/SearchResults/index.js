import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchByTag, fetchAllProducts } from "../../store/search";
import ProductPreview from "../ProductPreview";
import "./SearchResults.css";

const SearchResults = () => {
	const [loaded, setLoaded] = useState(false);
	const results = useSelector((state) => state.search.results);
	const { term } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			if (term === "all") {
				await dispatch(fetchAllProducts());
				return setLoaded(true);
			} else {
				await dispatch(searchByTag(term));
				return setLoaded(true);
			}
		})();
	}, [term, dispatch]);

	return (
		loaded && (
			<>
				<div className="feed-header">Your Search Results</div>
				{!results.length ? (
					<p className="no-results">Your search did not return any results.</p>
				) : (
					<></>
				)}
				<div className="feed-container">
					{results.map((product, i) => (
						<ProductPreview key={product.name.concat(i)} product={product} />
					))}
				</div>
			</>
		)
	);
};

export default SearchResults;
