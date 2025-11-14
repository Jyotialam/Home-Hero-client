import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import formImg from "../../assets/login-form-img.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | HomeHero";
  }, []);

  // handle email login
  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then((result) => {
        toast.success("Successfully signed in with Email");
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // handle google sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("Successfully signed in with Google");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
        {/* Left side (image for desktop only) */}
        <div className="hidden md:block md:w-1/2 h-96 md:h-auto">
          <img
            src={formImg}
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side (form) */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
              Login <span className="text-[#51ACFB]">for Services!</span>
            </h1>

            <form onSubmit={handleLogIn} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#51ACFB]"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#51ACFB]"
                  placeholder="********"
                  required
                />
              </div>

              <div className="text-right">
                <a className="text-blue-500 dark:text-blue-400 hover:underline text-sm">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#51ACFB] hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 btn"
              >
                Login
              </button>
            </form>

            <button
              onClick={handleGoogleSignIn}
              className="w-full mt-3 flex items-center justify-center gap-2 bg-[#51ACFB] hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 btn"
            >
              <FaGoogle />
              Login with Google
            </button>

            <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
              New to our website?{" "}
              <Link
                className="text-blue-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 "
                to="/auth/register"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
