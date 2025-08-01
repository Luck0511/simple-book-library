import '../assets/styleSheets/Item.css';
import {ItemContext} from "./Collection.jsx";
import {useContext, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";

const Item = () => {
    const item = useContext(ItemContext);

    /*esc keypress handling*/
    const navigate = useNavigate(); // for programmatic navigation

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' || event.key === 'Esc') {
                // Redirect to another route
                navigate('/collection');
            }
        };
        //listener for all window when Item popUp
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]); //navigate dependency to allow reMount in case of route changes from router

    return (
        <div className="popUpCard">
            <NavLink to={`/collection`}>
                <button className="clearButton">X</button>
            </NavLink>
            <img className="itemCover"
                 src={item?.book_image || item?.volumeInfo?.imageLinks.thumbnail}
                 alt="Cover Image"/>
            <div className="itemInfo">
                <h2><strong>{item?.title || item?.volumeInfo?.title}</strong></h2>
                <h3><i>{item?.author || item?.volumeInfo?.authors[0]}</i></h3>
                <p><i>Genre:</i> {item?.volumeInfo?.categories || <u>not defined</u>}</p>
                <p><i>Publisher:</i> {item?.publisher || item?.volumeInfo?.publisher}</p>
                <p><i>ISBN code:</i> {item?.primary_isbn13 || item?.volumeInfo?.industryIdentifiers[0].identifier}
                </p>
                <br/>
                <p><i>Plot:</i><br/>{item?.description || item?.volumeInfo?.description}</p>
                <br/>
                {item?.buy_links && <>
                <h4 style={{margin: 0}}>Buy links:</h4>
                <ul style={{margin: 0}}>
                    {item?.buy_links?.map((link, index) => (
                        <li key={index}>
                            <a href={link.url}><i>{link.name}</i></a>
                        </li>
                    ))}
                </ul>
                    </>
                }
                {item?.saleInfo &&
                    <h4><a href={item?.saleInfo.buyLink}>Buy Link</a></h4>
                }
            </div>
        </div>
)
}
export default Item;