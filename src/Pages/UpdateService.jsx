import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Img from "../assets/hero_image_01.png";

const UpdateService = () => {
  const data = useLoaderData();
  const service = data.result;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Update Service | Home-Hero";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedService = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      description: form.description.value,
      image: form.image.value,
    };

    fetch(`https://home-hero-server-virid.vercel.app/services/${service._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedService),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/my-services");
        console.log(data);
        toast.success("Service updated successfully!");
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.message);
      });
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
                Update <span className="text-[#51ACFB]">Service!</span>
              </h1>

              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset space-y-4">
                  {/* Name */}
                  <div>
                    <label className="label font-semibold mb-1 block">
                      Service Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={service.name}
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
                      defaultValue={service.category}
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
                      defaultValue={service.price}
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
                      defaultValue={service.description}
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
                      defaultValue={service.image}
                      required
                      className="input w-full rounded-xl border border-gray-200 focus:outline-[#51ACFB] placeholder-gray-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-4 btn text-white text-lg w-full bg-[#51ACFB] hover:bg-blue-600 border-none rounded-xl"
                  >
                    Update Service
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <img
          src={Img}
          alt="Update Service visual"
          className="w-1/2 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default UpdateService;
