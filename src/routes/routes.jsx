/*routes config file*/

import App from "../App.jsx";
import Collection from "../pages/Collection";

export const routes = [
    {
        element: <App />,
        path: '/',
        errorElement: <h1>404 not found (custom)</h1>,
        children: [
            {
                path: 'collection',
                element: <Collection />,
            },
        ]
    },
    {
        path: '*',
        element: <h1>404 not found (custom)</h1>,
    },
];