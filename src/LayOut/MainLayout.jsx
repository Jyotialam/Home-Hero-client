import React from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div>
            <div className="">
        <NavBar />
        <div className="my-4">
          <Outlet />
        </div>
        <Footer/>
      </div>
      <ToastContainer/>
        </div>
    );
};

export default MainLayout;