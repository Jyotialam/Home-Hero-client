import { createBrowserRouter } from "react-router";
import MainLayout from "../LayOut/MainLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Profile from "../Pages/Profile";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
         errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>,                  
                loader: () => fetch('http://localhost:3000/top-services')
            },
            {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
        ]
        
    }
])