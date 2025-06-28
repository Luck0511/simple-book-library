import '../assets/styleSheets/personalStyle.css';
import '../assets/styleSheets/CollectionList.css';
import collection from "../collection/collection.json";
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import {createContext, useState} from "react";


export const ItemContext=createContext(null);
export const ItemProvider = ({ children, selectedItem }) => {
    return (
        <ItemContext.Provider value={selectedItem}>
            {children}
        </ItemContext.Provider>
    );
};

const Collection = () =>{
    const [selectedItem, setSelectedItem] = useState(null);

    const selectItem = (item) => {
        setTimeout(()=>{
            setSelectedItem(item);
            console.log('done')},10)
    }
    return (
        <div className="collectionSec">
            <div className="collectionSec_topbar">
                <div className="topBar_searchBar">
                    <label htmlFor="searcBar">
                        <img src="src/assets/icons/BooksIcon.svg" alt="booksSymbol" className="icon"/>
                        <p>Search:</p>
                    </label>
                    <input type="text" placeholder="Book title..." id="searcBar" name="searcBar"/>
                </div>
            </div>
            <div className="outletPopUp">
                <ItemProvider selectedItem={selectedItem}>
                    <Outlet/>
                </ItemProvider>
            </div>
            <div className="collectionSec_items">
                {collection.map((item) => (
                    <NavLink key={item.id} to="item" onClick={()=>selectItem(item)}>
                        <div className="itemCard">
                            <img className="itemThumbnail" src={item.coverImage} alt="Cover Image" />
                            <div className="itemInfo">
                                <h3>{item.title} - {item.author}</h3>
                                <h5>{item.genre} - {item.year}</h5>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
export default Collection;