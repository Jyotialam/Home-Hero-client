import React, { useEffect, useContext } from "react";
import Img from "../assets/hero_image_01.png";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router";

const AddService = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Add Service | HomeHero";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      price: parseFloat(e.target.price.value),
      description: e.target.description.value,
      image: e.target.image.value,
      providerName: user?.displayName || "Anonymous",
      providerEmail: user?.email || "N/A",
    };

    fetch("https://home-hero-server-virid.vercel.app/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Service added successfully!");
        navigate("/my-services"); // navigate to MyServices
        e.target.reset();
      })
      .catch(() => toast.error("Failed to add service"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 py-8 px-2 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center overflow-y-auto py-10 px-4">
          <div className="w-full md:w-11/12 lg:w-10/12">
            <h1 className="text-3xl md:text-4xl font-bold mb-5 text-center md:text-left text-gray-900 dark:text-gray-100">
              Add New <span className="text-[#51ACFB]">Service</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <fieldset className="space-y-5">
                <div>
                  <label className="label font-semibold mb-1 block text-gray-700 dark:text-gray-200">
                    Service Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="input w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                    placeholder="Enter service name"
                  />
                </div>
                <div>
                  <label className="label font-semibold mb-1 block text-gray-700 dark:text-gray-200">
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    className="select w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="">Select Category</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Culinary">Culinary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label font-semibold mb-1 block text-gray-700 dark:text-gray-200">
                    Price (in USD)
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    className="input w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                    placeholder="e.g. 120"
                  />
                </div>
                <div>
                  <label className="label font-semibold mb-1 block text-gray-700 dark:text-gray-200">
                    Description
                  </label>
                  <textarea
                    name="description"
                    required
                    rows="4"
                    className="textarea w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                    placeholder="Enter service details"
                  ></textarea>
                </div>
                <div>
                  <label className="label font-semibold mb-1 block text-gray-700 dark:text-gray-200">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    required
                    className="input w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="label font-semibold mb-1 block text-gray-700 dark:text-gray-200">
                      Provider Name
                    </label>
                    <input
                      type="text"
                      value={user?.displayName || ""}
                      readOnly
                      className="input w-full rounded-xl border border-gray-200 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <label className="label font-semibold mb-1 block text-gray-700 dark:text-gray-200">
                      Provider Email
                    </label>
                    <input
                      type="text"
                      value={user?.email || ""}
                      readOnly
                      className="input w-full rounded-xl border border-gray-200 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 btn text-white text-lg w-full bg-[#51ACFB] hover:bg-blue-600 border-none rounded-xl"
                >
                  Add Service
                </button>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 justify-center items-center bg-blue-50 dark:bg-gray-700">
          <img src={Img} alt="Add Service" className="w-10/12 h-auto object-contain" />
        </div>
      </div>
    </div>
  );
};

export default AddService;
