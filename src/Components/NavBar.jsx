import { Link, NavLink } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaGear, FaUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import logoImg from "../assets/final-logo.png";
import { MdAddToPhotos, MdHomeRepairService } from "react-icons/md";
import { ImBoxAdd } from "react-icons/im";
import userIcon from "../assets/user.png";

// import { div } from "framer-motion/client";
import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = use(AuthContext);
  const pageLinks = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `flex items-center gap-1 ${
              isActive ? "border-b-2 border-white" : ""
            }`
          }
        >
          <GoHomeFill size={20} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/services"}
          className={({ isActive }) =>
            `flex items-center gap-1 ${
              isActive ? "border-b-2 border-white" : ""
            }`
          }
        >
          <MdHomeRepairService size={20} />
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/add-service"}
          className={({ isActive }) =>
            `flex items-center gap-1 ${
              isActive ? "border-b-2 border-white" : ""
            }`
          }
        >
          <ImBoxAdd size={16} /> Add Service
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/my-services"}
          className={({ isActive }) =>
            `flex items-center gap-1 ${
              isActive ? "border-b-2 border-white" : ""
            }`
          }
        >
          <MdHomeRepairService size={20} /> My Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/my-bookings"}
          className={({ isActive }) =>
            `flex items-center gap-1 ${
              isActive ? "border-b-2 border-white" : ""
            }`
          }
        >
          <MdAddToPhotos size={17} /> My Bookings
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="shadow-sm bg-[#5184AF] py-2 px-4 min-h-0 z-10">
      <div className="navbar text-white w-11/12 mx-auto">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost md:hidden text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow text-gray-700"
            >
              {pageLinks}
            </ul>
          </div>
          <Link to={"/"} className="flex items-center gap-2 text-2xl font-bold">
            <img src={logoImg} alt="" className="w-20 rounded-3xl" /> HomeHero
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{pageLinks}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-[50px] border-2 border-white rounded-full">
                  <img
                    alt="User"
                    referrerPolicy="no-referrer"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow text-gray-700"
              >
                <div className="pb-3 border-b border-b-gray-200">
                  <li className="text-sm font-bold">{user.displayName}</li>
                  <li className="text-xs">{user.email}</li>
                </div>
                <li className="mt-3">
                  <Link to={"/profile"}>
                    <FaUser /> Profile
                  </Link>
                </li>
                <li>
                  <a>
                    <FaGear /> Settings
                  </a>
                </li>
              </ul>
              <button
                onClick={signOutUser}
                className="btn rounded-md ml-3 text-lg bg-[#51ACFB] text-white border-none"
              >
                <IoLogOut /> Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <img src={userIcon} alt="" className="w-[50px] border-2 border-white rounded-full" />

              <Link
                to={"/auth/login"}
                className="btn rounded-md ml-3 text-lg bg-[#51ACFB] text-white border-none"
              >
                <IoLogIn /> Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
