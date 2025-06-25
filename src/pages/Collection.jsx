import '../assets/styleSheets/personalPalette.css'
import '../assets/styleSheets/collectionList.css';
import collection from "../collection/collection.json";
import {Outlet} from "react-router";

const Collection = () =>{
    return (
        <div className="collectionSec">
            <div className="collectionSec_topbar">
                <div className="topBar_searchBar">
                    <label htmlFor="searcBar">Search: </label> <br/>
                    <input type="text" placeholder="Search..." id="searcBar" name="searcBar"/>
                </div>
            </div>
            <Outlet/>
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