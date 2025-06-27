import './assets/styleSheets/App.css'
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";

function App() {
    const activeLink= ({isActive})=> isActive ? 'navLink active' : 'navLink';
    return (
        <>
            <div className="heroSec">
                <NavLink to="/" className="heroSec_logo">
                    <img src="src/assets/logo/LogoTitle.svg" alt="logo"/>
                </NavLink>
                <nav className="heroSec_nav">
                    <ul>
                        <li>
                            <NavLink to="/" className={activeLink}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/collection" className={activeLink}>
                                Collection
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={activeLink}>
                                About
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
