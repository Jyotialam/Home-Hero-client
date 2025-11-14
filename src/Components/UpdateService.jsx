import React, { useContext } from "react";
import Img from "../assets/hero_image_01.png";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate, useLoaderData } from "react-router";

const UpdateService = () => {
  const data = useLoaderData();
  const service = data?.result;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!service) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Service Not Found!</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      category: e.target.category.value,
      name: e.target.name.value,
      price: parseFloat(e.target.price.value),
      description: e.target.description.value,
      image: e.target.image.value,
      providerName: user?.displayName,
      providerEmail: user?.email,
    };

    fetch(`https://home-hero-server-virid.vercel.app/services/${service._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Service updated successfully!");
        navigate("/my-services");
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 py-8 px-2 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row w-full md:w-11/12 lg:w-10/12 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="w-full md:w-1/2 flex justify-center items-center overflow-y-auto py-10 px-4">
          <div className="w-full md:w-11/12 lg:w-10/12">
            <h1 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900 dark:text-gray-100">
              Update <span className="text-[#51ACFB]">Service</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label>Service Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={service.name}
                  required
                  className="input w-full bg-gray-100 dark:bg-gray-700"
                />
              </div>

              <div>
                <label>Category</label>
                <select
                  name="category"
                  defaultValue={service.category}
                  required
                  className="select w-full bg-gray-100 dark:bg-gray-700"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>

              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={service.price}
                  required
                  className="input w-full bg-gray-100 dark:bg-gray-700"
                />
              </div>

              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  defaultValue={service.description}
                  required
                  rows="4"
                  className="textarea w-full bg-gray-100 dark:bg-gray-700"
                ></textarea>
              </div>

              <div>
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  defaultValue={service.image}
                  required
                  className="input w-full bg-gray-100 dark:bg-gray-700"
                />
              </div>

              <button className="btn w-full text-white bg-[#51ACFB]">
                Update Service
              </button>
            </form>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 justify-center items-center bg-blue-50 dark:bg-gray-700">
          <img src={Img} className="w-10/12" />
        </div>
      </div>
    </div>
  );
};

export default UpdateService;
