import { createBrowserRouter } from "react-router";
import MainLayout from "../LayOut/MainLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>
        
    }
])