import '../assets/styleSheets/collectionList.css';
import collection from "../collection/collection.json";

const Collection = () =>{
    return (
        <div className="collectionSec">
            <div className="collectionSec_topbar">
                <div className="topBar_searchBar">
                    <label for="searcBar">Search: </label> <br/>
                    <input type="text" placeholder="Search..." id="searcBar" name="searcBar"/>
                </div>
            </div>
            <div className="collectionSec_items">
                {collection.map((item) => (
                    <div className="itemCard" key={item.id}>
                        <img className="itemThumbnail" src={item.coverImage} alt="Cover Image" />
                        <div className="itemInfo">
                            <h3>{item.title} - {item.author}</h3>
                            <h5>genre: {item.genre} - year:{item.year}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Collection;