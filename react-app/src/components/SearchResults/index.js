import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchByTag } from "../../store/search";
import ProductPreview from "../ProductPreview";

const SearchResults = () => {
    const [loaded, setLoaded] = useState(false);
    const results = useSelector((state) => state.search.results)
    const { term } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        (async() => {
            await dispatch(searchByTag(term));
            return setLoaded(true);
        })();
    }, [term, dispatch])

    return loaded && (
        <>
            <div className="feed-header">Your Search Results</div>
            <div className="feed-container">
                {results.map((product, i) => (
                    <ProductPreview key={product.name.concat(i)} product={product} />
                ))}
            </div>
        </>
    )
};

export default SearchResults;
