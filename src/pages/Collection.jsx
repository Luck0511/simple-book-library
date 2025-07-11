import '../assets/styleSheets/personalStyle.css';
import '../assets/styleSheets/CollectionList.css';
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import axios from 'axios';

const apiKey = import.meta.env.VITE_apikey;
const bestNonFiction = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${apiKey}`
const bestFiction = `https://api.nytimes.com/svc/books/v3/lists/combined-print-and-e-book-fiction.json?api-key=${apiKey}`

export const ItemContext = createContext(null);
export const ItemProvider = ({children, passedItem}) => {
    return (
        <ItemContext.Provider value={passedItem}>
            {children}
        </ItemContext.Provider>
    );
};

const Collection = () => {
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
                setCollections([nonFiction.results, fiction.results]);
                console.log('Book fetching successful')
            } catch (error) {
                setLoading(false);
                console.error('Error fetching books:', error);
            } finally {
                console.log('Fetching ended');
                setLoading(false);
            }
        }
        fetchBest().catch((error) => console.error(error));
    }, [])

    const [selectedItem, setSelectedItem] = useState(null);

    const selectItem = (item) => {
        setSelectedItem(item);
        console.log('done');
    }
    return (
        <div className="collectionSec">
            <div className="collectionSec_topbar">
                <label htmlFor="searchBar" id="searchSymbol">
                    <img src="/icons/BooksIcon.svg" alt="booksSymbol" className="icon"/>
                    <p>Search:</p>
                </label>
                <div className="topBar_searchBar">
                    <div className="inputWrapper">
                        <input type="text" placeholder="Book title..." id="searchBar" name="searcBar"/>
                        <button type="submit" id="searchBtn">
                            <label htmlFor="searchBar">
                                <img src="/icons/searchIcon.svg" alt="searchIcon" id="searchIcon"/>
                            </label>
                        </button>
                    </div>
                </div>
            </div>
            <div className="outletPopUp">
                <ItemProvider passedItem={selectedItem}>
                    <Outlet/>
                </ItemProvider>
            </div>
            {loading && <h2 style={{textAlign: 'center', fontSize: '32px', color: 'var(--title)'}}>Loading
                bestsellers...</h2>}
            <div className="collectionSec_wrapper">
                {bestCollections?.map((bestList, index) => (
                    <section className="section_Wrapper" key={index}>
                        <h2 className="sectionHeader"><b><i>Bestsellers of the
                            week:</i></b><br/>{bestList.display_name}</h2>
                        <div className="section_Items">
                            {bestList.books?.map((item) => (
                                <NavLink key={item.primary_isbn13}
                                         to={`item`}
                                         onClick={()=>selectItem(item)}
                                         className="itemCard_wrapper">
                                    <div className="itemCard">
                                        <h2 style={{color:'hsl(51, 39%, 44%)'}}>-{item.rank}-</h2>
                                        <br/>
                                        <h3 className="cardInfo"><i>{item.title}</i>
                                        </h3>
                                        <h4 className="cardInfo">{item.author}</h4>
                                        <img className="cardThumbnail" src={item.book_image} alt="Cover Image"/>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
export default Collection;