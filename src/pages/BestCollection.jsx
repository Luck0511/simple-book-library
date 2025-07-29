import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const bestApiKey = import.meta.env.VITE_apikey;
const bestNonFiction = `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${bestApiKey}`
const bestFiction = `https://api.nytimes.com/svc/books/v3/lists/combined-print-and-e-book-fiction.json?api-key=${bestApiKey}`

export const BestCollection = ({onLoading, onSelectItem}) => {
    /*bestseller collection state*/
    const [bestCollection, setbestCollection] = useState([]);

    const selectItem = (item) => {
        onSelectItem(item)
    }

    /*bestsellers collection setUp*/
    useEffect(() => {
        const fetchBest = async () => {
            onLoading(true);
            console.log('Fetching bestseller...');
            try {
                const [nonFiction, fiction] = await Promise.all([
                    axios.get(bestNonFiction)
                        .then((response) => response.data),
                    axios.get(bestFiction)
                        .then((response) => response.data),
                ]);
                setbestCollection([nonFiction.results, fiction.results]);
                console.log('Book fetching successful')
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                onLoading(false);
                console.log('Fetching ended');
            }
        }
        fetchBest().catch((error) => console.error(error));
    }, [])

    return (
        <>
            {bestCollection.map((bestList, index) => (
                <section className="section_Wrapper" key={index}>
                    <div className="sectionHeader">
                        <a href="https://developer.nytimes.com" >
                            <img className="brandingLogo" src="/NYT-apiIcon.png" alt="Data provided by The New York Times"/>
                        </a>
                        <h2>
                            <b><i>Bestsellers of the week:</i></b> <br/>
                            {bestList.display_name}
                        </h2>
                    </div>
                    <div className="section_Items">
                        {bestList.books?.map((item) => (
                            <NavLink key={item.primary_isbn13}
                                     to={`item`}
                                     onClick={() => selectItem(item)}
                                     className="itemCard_wrapper">
                                <div className="itemCard">
                                    <h2 style={{color: 'hsl(51, 39%, 44%)'}}>-{item.rank}-</h2>
                                    <br/>
                                    <h3 className="cardInfo"><i>{item.title}</i>
                                    </h3>
                                    <h4 className="cardInfo">{item.author}</h4>
                                    <img className="cardThumbnail"
                                         src={item.book_image}
                                         alt="Cover Image"/>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </section>
            ))}
        </>
    )
}