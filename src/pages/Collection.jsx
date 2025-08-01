import '../assets/styleSheets/personalStyle.css';
import '../assets/styleSheets/CollectionList.css';
import {Outlet} from "react-router";
import {createContext, useState} from "react";
import axios from 'axios';
import {PuffLoader} from "react-spinners";
import {SearchRes} from "./SearchRes.jsx";
import {BestCollection} from "./BestCollection.jsx";

const googleApiKey = import.meta.env.VITE_googleKey;

/*selected item context provider*/
export const ItemContext = createContext(null);
export const ItemProvider = ({children, passedItem}) => {
    return (
        <ItemContext.Provider value={passedItem}>
            {children}
        </ItemContext.Provider>
    );
};

/*collections context provider*/
export const CollectionListContext = createContext(null);
export const CollectionListProvider = ({children, collection}) => {
    return (
        <CollectionListContext.Provider value={collection}>
            {children}
        </CollectionListContext.Provider>
    )
}

const Collection = () => {
    const [showRes, setShowRes] = useState(false);

    /*loading set logic --> setLoading sets loading state*/
    const [loading, setLoading] = useState(false);
    const changeLoading = (newState) => {
        setLoading(newState);
    }

    /*save value from input searchbar*/
    const [getValue, setValue] = useState('');
    /*parse input to make it url friendly*/
    const parseValue = (input) => {
        const cleanInput = input.trim();
        //encode special characters, then replace spaces with dashes
        const urlFriendly = encodeURIComponent(cleanInput).replace(/%20/g, '-');
        setValue(urlFriendly);
    }

    /*reset search*/
    const resetSearch = ()=>{
        setShowRes(false);
    }

    /*fetch search result*/
    const enhancedQuery = `${getValue}`;
    const googleBooks = `https://www.googleapis.com/books/v1/volumes?q=${enhancedQuery}&projection=full&orderBy=relevance&maxResults=25&key=${googleApiKey}`

    const [resList, setResList] = useState([]);

    const fetchSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(getValue===''){
            setShowRes(false);
            setLoading(false);
        }
        try {
            console.log('Fetching results...');
            console.log(googleBooks)
            const response = await axios.get(googleBooks);
            setResList(response.data.items);
            console.log('Results fetching successful');
        } catch (error) {
            setResList([{volumeInfo:{title:"Error", authors:[error.message]}}])
            console.error('Error fetching results:', error);
        } finally {
            console.log('Fetching ended');
            setShowRes(true);
            setLoading(false);
        }
    }

    /*select item from collection*/
    const [selectedItem, setSelectedItem] = useState(null);
    const selectItem = (item) => {
        setSelectedItem(item);
        console.log('item selected: ', selectedItem);
    }

    return (
        <div className="collectionSec">
            <div className="collectionSec_topbar">
                <label htmlFor="searchBar" id="searchSymbol">
                    <img src="/icons/BooksIcon.svg" alt="booksSymbol" className="icon"/>
                    <p>Search:</p>
                </label>
                <div className="topBar_searchBar">
                    <form onSubmit={fetchSearch} className="inputWrapper">
                        <input type="text"
                               placeholder="Type here to search..."
                               autoComplete="off"
                               id="searchBar"
                               name="searcBar"
                               onChange={(e) => parseValue(e.target.value)}/>
                        <button type="submit" id="searchBtn">
                            <label htmlFor="searchBar">
                                <img src="/icons/searchIcon.svg" alt="searchIcon" id="searchIcon"/>
                            </label>
                        </button>
                    </form>
                </div>
            </div>
            {
                loading &&
                <div className="loadingWrapper">
                    <PuffLoader color="hsla(226, 100%, 3%, 1)" size={60}/>
                    <h3>Loading...</h3>
                </div>
            }
            {/*displaying collections*/}
            <div className="collectionSec_wrapper">
                {!showRes &&
                    <BestCollection onLoading={changeLoading} onSelectItem={selectItem}/>
                }
            </div>
            <div className="collectionSec_wrapper" id="searchResult">
                {showRes && !loading &&
                    <CollectionListProvider collection={resList}>
                        <SearchRes onSelectItem={selectItem} searchQuery={getValue} clearSearch={resetSearch}/>
                    </CollectionListProvider>
                }
            </div>
            <div className="outletPopUp">
                <ItemProvider passedItem={selectedItem}>
                    <Outlet/>
                </ItemProvider>
            </div>
        </div>
    )
}
export default Collection;