import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { inject } from '@vercel/analytics'; //vercel analytics
import { injectSpeedInsights } from '@vercel/speed-insights'; //vercel speed insights
import './assets/styleSheets/index.css'
import {routes} from "./routes/routes.jsx";

//injects
inject();
injectSpeedInsights();

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
)
