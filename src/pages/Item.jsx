import '../assets/styleSheets/Item.css';
import {useContext} from "react";
import {ItemContext} from "./Collection.jsx";

const Item = () => {
    const item = useContext(ItemContext);
    return (
        <>
            <div className="itemCard">
                <img className="itemThumbnail" src={item?.coverImage} alt="Cover Image" />
                <div className="itemInfo">
                    <h3>{item?.title} - {item?.author}</h3>
                    <h5>genre: {item?.genre} - year:{item?.year}</h5>
                </div>
            </div>
        </>
    )
}
export default Item;