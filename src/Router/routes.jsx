import { createBrowserRouter } from "react-router";
import MainLayout from "../LayOut/MainLayout";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
                
            }
        ]
        
    }
])