import React, { use, useEffect } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import formImg from "../../assets/login-form-img.jpg";
import { Link, useLocation, useNavigate } from 'react-router';
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';

const Login = () => {
  const {signInUser,signInWithGoogle} = use(AuthContext)
//   console.log(signInUser,signInWithGoogle);
  const location = useLocation();
  const navigate = useNavigate();

    useEffect(() => {
      document.title = "Login | Home-hero";
    }, []);

//   handle email login
const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully signed in with Email")
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message)
      });
  };


//   handle google sign in
   const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully signed in with Google")
        navigate(location?.state || "/");
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message)
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 rounded-2xl">
      {/* Parent container */}
      <div className="flex w-11/12 h-[80vh] bg-white rounded-l-2xl rounded-r-4xl overflow-hidden">
        {/* Right side (form) */}
        <div className="w-1/2 flex justify-center items-center bg-base-100">
          <div className="card w-10/12 shadow-2xl">
            <div className="card-body">
              <h1 className="text-4xl font-bold mb-4">
                Login now <span className="text-[#51ACFB]">for Services!</span>
              </h1>
              {/* form */}
              <form onSubmit={handleLogIn}>
              <fieldset className="fieldset">
                {/* email */}
                <label className="label font-bold">Email</label>
                <input
                  type="email"
                  name='email'
                  className="input font-light text-gray-400  focus:border-0 focus:outline-gray-200 w-full"
                  placeholder="Your Email"
                />
                <label className="label font-bold">Password</label>
                <input
                  type="password"
                  name='password'
                  className="input font-light text-gray-400  focus:border-0 focus:outline-gray-200 w-full"
                  placeholder="********"
                />
                <div className="mt-2">
                  <a className="link link-hover text-blue-500">
                    Forgot password?
                  </a>
                </div>
                <button className="mt-3 btn text-white hover:bg-blue-600  btn-neutral border-none text-lg w-full bg-[#51ACFB]">
                  Login
                </button>
              </fieldset>
              </form>
              {/*  */}
              <button
          onClick={handleGoogleSignIn}
          className="mt-3 btn text-white hover:bg-blue-600  btn-neutral border-none text-lg w-full bg-[#51ACFB]"
        >
          <FaGoogle />
          Login with Google
        </button>
        <p className="text-center">
          New to our website? Please  <Link
            className="text-blue-500 hover:text-blue-800"
            to="/auth/register"
          >
             Register
          </Link>
        </p>
            </div>
          </div>
        </div>
        {/*  */}
        {/* Left side (image) */}
        <div className="w-1/2 h-full">
          <img
            src={formImg}
            alt="Login visual"
            className="w-full h-full object-cover rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
