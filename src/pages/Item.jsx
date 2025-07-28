import '../assets/styleSheets/Item.css';
import {ItemProvider, ItemContext} from "./Collection.jsx";
import {useContext, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";

const Item = () => {
    const item = useContext(ItemContext)

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
            <img className="itemCover" src={item?.book_image} alt="Cover Image"/>
            <div className="itemInfo">
                <h2><strong>{item?.title}</strong></h2>
                <h4><i>{item?.author}</i></h4>
                <p><i>Publisher:</i> {item?.publisher}</p>
                <p><i>ISBN code:</i> {item?.primary_isbn13}</p>
                <br/>
                <p><i>Plot:</i><br/>{item?.description}</p>
                <br/>
                <h5 style={{margin: 0}}>Buy links:</h5>
                <ul style={{margin: 0}}>
                    {item?.buy_links.map((link, index) => (
                        <li key={index}>
                            <a href={link.url}><i>{link.name}</i></a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Item;