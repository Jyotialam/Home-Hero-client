import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Services | HomeHero";
  }, []);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    fetch(
      `https://home-hero-server-virid.vercel.app/my-services?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setServices(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This service will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://home-hero-server-virid.vercel.app/services/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setServices(services.filter((s) => s._id !== id));
            Swal.fire("Deleted!", "Service has been deleted.", "success");
          })
          .catch(() => toast.error("Error deleting service!"));
      }
    });
  };

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-900 dark:text-gray-100">
        Please login to view your services.
      </div>
    );

  if (services.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-900 dark:text-gray-100">
        You haven't added any services yet.
      </div>
    );

  return (
    <div className="w-full px-2 py-4 md:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        My <span className="text-[#51ACFB]">Services</span>
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-left text-gray-900 dark:text-gray-100">
                #
              </th>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-left text-gray-900 dark:text-gray-100">
                Service Name
              </th>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-left text-gray-900 dark:text-gray-100">
                Category
              </th>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-left text-gray-900 dark:text-gray-100">
                Price ($)
              </th>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-left text-gray-900 dark:text-gray-100">
                Provider
              </th>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-right text-gray-900 dark:text-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr
                key={service._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                  {service.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                  {service.category}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                  {service.price}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                  {service.providerName}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-right">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <Link
                      to={`/update-service/${service._id}`}
                      className="btn btn-sm bg-[#51ACFB] text-white hover:bg-blue-600"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {services.map((service, index) => (
          <div
            key={service._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md"
          >
            <p className="text-gray-900 dark:text-gray-100 font-semibold">
              <span className="text-[#51ACFB]">#{index + 1}</span> {service.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Category:</span> {service.category}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Price:</span> ${service.price}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Provider:</span> {service.providerName}
            </p>
            <div className="flex gap-2 mt-2">
              <Link
                to={`/update-service/${service._id}`}
                className="btn btn-sm bg-[#51ACFB] text-white hover:bg-blue-600 flex-1"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(service._id)}
                className="btn btn-sm bg-red-500 text-white hover:bg-red-600 flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServices;
