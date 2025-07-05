import '../assets/styleSheets/Item.css';
import {ItemProvider, ItemContext} from "./Collection.jsx";
import {useContext} from "react";
import {NavLink} from "react-router-dom";

const Item = () => {
    /*const {isbn13} = useParams();*/
    const item = useContext(ItemContext)
    /*const item = itemList?.results.books.find((book) => book?.primary_isbn13 === bookCode);*/

    return (
        <ItemProvider>
            <div className="popUpCard">
                <NavLink to={`/collection`}><button className="clearButton">X</button></NavLink>
                <img className="itemCover" src={item?.book_image} alt="Cover Image" />
                <div className="itemInfo">
                    <h2><strong>{item?.title}</strong></h2>
                    <h4><i>{item?.author}</i></h4>
                    <p><i>Publisher:</i> {item?.publisher}</p>
                    <p><i>ISBN code:</i> {item?.primary_isbn13}</p>
                    <br/>
                    <p><i>Plot:</i><br/>{item?.description}</p>
                    <br/>
                    <h5 style={{margin:0}}>Buy links:</h5>
                    <ul style={{margin:0}}>
                        {item?.buy_links.map((link, index) => (
                            <li ley={index}>
                                <a href={link.url}><i>{link.name}</i></a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ItemProvider>
    )
}
export default Item;