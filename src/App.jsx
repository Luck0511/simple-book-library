import './assets/styleSheets/App.css'
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";

function App() {
    return (
        <>
            <div className="heroSec">
                <div className="heroSec_logo">
                    <h1>SBL</h1>
                    <h2>Simple Book Library</h2>
                </div>
                <nav className="heroSec_nav">
                    <ul>
                        <li>
                            <NavLink to="/" style={({isActive}) => isActive ? {fontWeight: 'bold'} : {}}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/collection" style={({isActive}) => isActive ? {fontWeight: 'bold'} : {}}>
                                Collection
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" style={({isActive}) => isActive ? {fontWeight: 'bold'} : {}}>
                                Empty
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet/>
        </>
    )
}

export default App
