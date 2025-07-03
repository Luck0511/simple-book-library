import '../assets/styleSheets/Item.css';
import {ItemProvider, ItemContext} from "./Collection.jsx";
import {useContext} from "react";
import {NavLink} from "react-router-dom";

const Item = () => {
    const item = useContext(ItemContext)

    return (
        <ItemProvider>
            <div className="popUpCard">
                <img className="itemThumbnail" src={item?.book_image} alt="Cover Image" />
                <div className="itemInfo">
                    <h2>{item?.title} - {item?.author}</h2>
                    <h4>{item?.genre} - {item?.year}</h4>
                    <p><strong>ISBN code:</strong> {item?.isbn}</p>
                    <p>{item?.description}</p>
                </div>
                <NavLink to={`/collection`} className="clearButton">Clear</NavLink>
            </div>
        </ItemProvider>
    )
}
export default Item;