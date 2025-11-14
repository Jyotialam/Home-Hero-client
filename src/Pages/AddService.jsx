import React, { useEffect, use } from "react";
import Img from "../assets/hero_image_01.png";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router";

const AddService = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Add Service | Home-Hero";
  }, []);

  const { user } = use(AuthContext);

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
    console.log(formData);
    fetch("https://home-hero-server-virid.vercel.app/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/my-services");
        toast.success("Service added successfully!");
        e.target.reset();
      })
      .catch(() => toast.error("Failed to add service"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 rounded-2xl">
      {/* Main Container */}
      <div className="flex w-11/12 min-h-screen bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Side - Form */}
        <div className="w-1/2 flex justify-center items-center bg-base-100 overflow-y-auto py-6">
          <div className="card w-10/12 shadow-2xl">
            <div className="card-body">
              <h1 className="text-4xl font-bold mb-2">
                Add New <span className="text-[#51ACFB]">Service</span>
              </h1>

              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset space-y-5">
                  {/* Name */}
                  <div>
                    <label className="label font-semibold mb-1 block">
                      Service Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="input w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] placeholder-gray-500"
                      placeholder="Enter service name"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="label font-semibold mb-1 block">
                      Category
                    </label>
                    <select
                      name="category"
                      required
                      className="select w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] placeholder-gray-500"
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

                  {/* Price */}
                  <div>
                    <label className="label font-semibold mb-1 block">
                      Price (in USD)
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      className="input w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] placeholder-gray-500"
                      placeholder="e.g. 120"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="label font-semibold mb-1 block">
                      Description
                    </label>
                    <textarea
                      name="description"
                      required
                      rows="4"
                      className="textarea w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] placeholder-gray-500"
                      placeholder="Enter service details"
                    ></textarea>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="label font-semibold mb-1 block">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      required
                      className="input w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] placeholder-gray-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Provider Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label font-semibold mb-1 block">
                        Provider Name
                      </label>
                      <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="input w-full rounded-xl border border-gray-200 bg-gray-100 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="label font-semibold mb-1 block">
                        Provider Email
                      </label>
                      <input
                        type="text"
                        value={user?.email || ""}
                        readOnly
                        className="input w-full rounded-xl border border-gray-200 bg-gray-100 text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
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
        </div>
        {/* Right Side - Image */}
        <img
          src={Img}
          alt="Add Service visual"
          className="w-1/2 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default AddService;
