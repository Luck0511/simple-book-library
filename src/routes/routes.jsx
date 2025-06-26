/*routes config file*/

import App from "../App.jsx";
import Collection from "../pages/Collection";
import Item from "../pages/Item";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";

export const routes = [
    {
        element: <App/>,
        path: '/',
        errorElement: <h1>404 not found (custom)</h1>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'collection',
                element: <Collection/>,
                children: [
                    {
                        path: 'collection/item',
                        element: <Item/>
                    }
                ]
            },
            {
                path: 'about',
                element: <About/>,
            }
        ]
    },
    {
        path: '*',
        element: <h1>404 not found (custom)</h1>,
    },
];