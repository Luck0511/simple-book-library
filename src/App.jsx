import './assets/styleSheets/App.css'
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";

function App() {
    return (
        <>
            <div className="heroSec">
                <div className="heroSec_logo">
                    <img src="src/assets/logo/LogoTitle.svg" alt="logo"/>
                </div>
                <nav className="heroSec_nav">
                    <ul>
                        <li>
                            <NavLink to="/" className="navLink">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/collection" className="navLink">
                                Collection
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className="navLink">
                                Empty
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet className="outletChild"/>
        </>
    )
}

export default App
