import React from "react";
import { Link, useRouteError } from "react-router";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar />
      <div className="flex-1 my-5">
      <div className=" flex flex-col justify-center items-center font-bold text-xl gap-5">
        <span>{error.message}</span>
        <span className=" lg:text-5xl text-3xl">Oops, Page not found! </span>
        <p className="font-medium text-base">
          The page you are requesting is not found on our system.
        </p>

        <Link
          to="/"
          className="btn rounded-md text-lg bg-[#51ACFB] text-white border-none "
        >
          Go Back to Home!
        </Link>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
