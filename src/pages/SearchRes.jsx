import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {CollectionListContext} from "./Collection.jsx";

export const SearchRes = ({onSelectItem, searchQuery, clearSearch}) => {

    const searchRes = useContext(CollectionListContext)

    const selectItem = (item) => {
        onSelectItem(item)
    }

    return (
        <section className="section_Wrapper">
            <section className="sectionHeader">
                <h2>Search results for:<br/> <i>{searchQuery}</i></h2>
                <button onClick={()=>clearSearch()}>Clear research:</button>
            </section>
            <div className="section_Items">
                {searchRes.map((item) => (
                    <NavLink key={item.id}
                             to={`item`}
                             onClick={() => selectItem(item)}
                             className="itemCard_wrapper">
                        <div className="itemCard">
                            <h3 className="cardInfo"><i>{item.volumeInfo.title}</i>
                            </h3>
                            <h4 className="cardInfo">{item.volumeInfo.authors?.[0]}</h4>
                            <img className="cardThumbnail"
                                 src={item.volumeInfo.imageLinks.thumbnail}
                                 alt="Cover Image"/>
                        </div>
                    </NavLink>
                ))}
            </div>
        </section>
    )
}