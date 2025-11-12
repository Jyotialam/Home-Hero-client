import React, { use, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import formImg from "../../assets/login-form-img.jpg"; // Login page-এর মতো একই ইমেজ

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "Register | Home-hero";
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(name, photoURL);
        toast.success("User created successfully!");
        event.target.reset();
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("User created successfully!");
        console.log(result.user);
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-200 rounded-2xl">
      {/* Parent container */}
      <div className="flex w-11/12 min-h-[90vh] bg-white rounded-2xl overflow-hidden">
        {/* Right side (form) */}
        <div className="w-1/2 flex justify-center items-center bg-base-100">
          <div className="card w-full shadow-2xl">
            <div className="card-body">
              <h1 className="text-4xl font-bold mb-4">
                Register now{" "}
                <span className="text-[#51ACFB]">to join Home-hero!</span>
              </h1>

              {/* form */}
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  <label className="label font-bold">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input font-light text-gray-400 focus:border-0 focus:outline-gray-200 w-full"
                    placeholder="Your Name"
                  />

                  <label className="label font-bold">Photo URL</label>
                  <input
                    type="text"
                    name="photoURL"
                    className="input font-light text-gray-400 focus:border-0 focus:outline-gray-200 w-full"
                    placeholder="https://example.com/photo.jpg"
                  />

                  <label className="label font-bold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input font-light text-gray-400 focus:border-0 focus:outline-gray-200 w-full"
                    placeholder="Your Email"
                  />

                  <label className="label font-bold">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input font-light text-gray-400 focus:border-0 focus:outline-gray-200 w-full"
                    placeholder="********"
                  />

                  <button className="mt-3 btn text-white hover:bg-blue-600  btn-neutral border-none text-lg w-full bg-[#51ACFB]">
                    Register
                  </button>
                </fieldset>
              </form>

              <button
                onClick={handleGoogleSignIn}
                className="mt-3 btn text-white hover:bg-blue-600  btn-neutral border-none text-lg w-full bg-[#51ACFB]"
              >
                <FaGoogle />
                Sign up with Google
              </button>

              <p className="text-center mt-2">
                Already have an account? Please{" "}
                <Link
                  className="text-blue-500 hover:text-blue-800"
                  to="/auth/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Left side (image) */}
        <div className="w-1/2 h-full">
          <img
            src={formImg}
            alt="Register visual"
            className="w-full h-full object-cover rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
