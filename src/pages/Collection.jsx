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
export const ItemProvider = ({children, selectedItem}) => {
    return (
        <ItemContext.Provider value={selectedItem}>
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
            {loading && <h2 style={{textAlign: 'center', fontSize: '32px', color: 'var(--title)'}}>Loading
                bestsellers...</h2>}
            <div className="collectionSec_wrapper">
                {bestCollections?.map((bestList, index) => (
                    <section className="section_Wrapper" key={index}>
                        <h2 className="sectionHeader"><b><i>Bestsellers of the week:</i></b><br/>{bestList.display_name}</h2>
                        <div className="section_Items">
                            {bestList.books?.map((item) => (
                                <NavLink key={item.primary_isbn13}
                                         to="item"
                                         className="itemCard_wrapper"
                                         onClick={() => selectItem(item)}>
                                    <div className="itemCard">
                                        <h2>-{item.rank}-</h2>
                                        <br/>
                                        <h3 className="itemInfo"><i>{item.title}</i></h3>
                                        <h4 className="itemInfo">{item.author}</h4>
                                        <img className="itemThumbnail" src={item.book_image} alt="Cover Image"/>
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