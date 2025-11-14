import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Profile | HomeHero";

    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setLoading(false);
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, photoURL);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile!");
    }
  };

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div className="w-11/12 mx-auto p-6 md:p-10 lg:p-12">
      <h1 className="text-4xl font-bold mb-10 text-center">
        My <span className="text-[#51ACFB]">Profile</span>
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-[#51ACFB]"
          />
          <div className="flex-1">
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Last Login:</strong>{" "}
              {user.metadata?.lastSignInTime || "N/A"}
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-semibold">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Photo URL:</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-[#51ACFB] text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
