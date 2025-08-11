import '/src/assets/styleSheets/Home.css';
import {NavLink} from "react-router-dom";

const Home = () => {
    return (
        <div className="heroBody">
            <section className="title">
                <section className="text">
                    <h2>Welcome to SBL</h2>
                    <h3>an online <br/><i>Simple Book Library</i></h3>
                </section>
                <img src="/logo/FavIcon.svg" alt="logo" className="backImage"/>
            </section>
            <section className="heroContent">
                <div>
                    <p>
                        SBL, or Simple Book Library, is a simple platform for readers! <br/>
                        here you can check the weekly best-selling books or you can search for any book's info in
                        the
                        same place,<br/> whether you're searching for new inspiration or
                        simply deciding what to read next!
                    </p>
                    <NavLink to="/collection" className="navLink">
                        Try it out!
                    </NavLink>
                </div>
                <h4>More details</h4>
                <div>
                    <p>
                        Hi! I am Luca Terranova,<br/> a young entry-level <u><b>full-stack
                        developer</b></u> and <u><b>software
                        architect</b></u>,<br/>
                        and this is one of my first projects ever created, if you're curious to know more, get to
                        know
                        me and this project in the about page!
                    </p>
                    <NavLink to="/about" className="navLink">
                        See more information
                    </NavLink>
                </div>
            </section>
        </div>
    )
}
export default Home;