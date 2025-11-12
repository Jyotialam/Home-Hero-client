import { createBrowserRouter } from "react-router";
import MainLayout from "../LayOut/MainLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Profile from "../Pages/Profile";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        hydrateFallbackElement: <p className="flex justify-center items-center text-5xl">Loading...</p>,
         errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>,                  
                // loader: () => fetch('http://localhost:3000/top-services')
            },
    //         {
    //     path: "/profile",
    //     element: (
    //       <PrivateRoute>
    //         <Profile />
    //       </PrivateRoute>
    //     ),
    //   },
       {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
        ]
        
    }
])