import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import './assets/styleSheets/index.css'
import {routes} from "./routes/routes.jsx";

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
)
