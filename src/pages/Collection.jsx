import '../assets/styleSheets/personalStyle.css';
import '../assets/styleSheets/CollectionList.css';
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import axios from 'axios';

const API_KEY = 'ZDwgZRGSseBHQV72X9TRPVR3qjxoFPcC';

const bestNonFiction = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${API_KEY}`
const bestFiction = `https://api.nytimes.com/svc/books/v3/lists/combined-print-and-e-book-fiction.json?api-key=${API_KEY}`

export const ItemContext=createContext(null);
export const ItemProvider = ({ children, selectedItem }) => {
    return (
        <ItemContext.Provider value={selectedItem}>
            {children}
        </ItemContext.Provider>
    );
};

const Collection = () =>{
    const [bestCollections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);

    /*bestsellers collection setUp*/
    useEffect(() => {
        const fetchBest = async () => {
            console.log('Fetching bestseller...');
            try {
                setLoading(true);
                const [nonFiction, fiction] = await Promise.all([
                    axios.get(bestNonFiction)
                        .then((response) => response.data),
                    axios.get(bestFiction)
                        .then((response) => response.data),
                ]);
                console.log(nonFiction.results.books);
                console.log(fiction.results.books);
                setCollections([nonFiction.results.books, fiction.results.books]);
            }catch (error) {
                setLoading(false);
                console.log('Error fetching books:',error);
            }finally {
                console.log('Fetching ended');
                setLoading(false);
            }
        }
        fetchBest();
    },[])

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
            <div className="collectionSec_wrapper">
                {bestCollections?.map((bestList, index) => (
                    <div key={index} className="collectionSec_items">
                        <p>Hello {index}</p>
                        {bestList?.map((item) => (
                            <NavLink key={item.primary_isbn13} to="item" onClick={()=>selectItem(item)}>
                                <div className="itemCard">
                                    <img className="itemThumbnail" src={item.book_image} alt="Cover Image" />
                                    <div className="itemInfo">
                                        <h3>{item.title} - {item.author}</h3>
                                        <h5>{item.genre} - {item.year}</h5>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Collection;