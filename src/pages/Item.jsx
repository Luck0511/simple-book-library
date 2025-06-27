import '../assets/styleSheets/Item.css';
import {ItemProvider, ItemContext} from "./Collection.jsx";
import {useContext} from "react";

const Item = () => {
    const item = useContext(ItemContext)

    return (
        <ItemProvider>
            <div className="popUpCard">
                <img className="itemThumbnail" src={item?.largeImage} alt="Cover Image" />
                <div className="itemInfo">
                    <h3>{item?.title} - {item?.author}</h3>
                    <h5>genre: {item?.genre} - year:{item?.year}</h5>
                </div>
            </div>
        </ItemProvider>
    )
}
export default Item;