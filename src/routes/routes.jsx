/*routes config file*/

import App from "../App.jsx";
import Collection from "../pages/Collection";
import Item from "../pages/Item";

export const routes = [
    {
        element: <App />,
        path: '/',
        errorElement: <h1>404 not found (custom)</h1>,
        children: [
            {
                path: 'collection',
                element: <Collection />,
                children: [
                    {
                        path: 'collection/item',
                        element: <Item />
                    }
                ]
            },
        ]
    },
    {
        path: '*',
        element: <h1>404 not found (custom)</h1>,
    },
];