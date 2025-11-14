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
    // 
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading your services...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Please login to view your services.
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        You haven't added any services yet.
      </div>
    );
  }

  // DELETE HANDLER
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
          .then((data) => {
            if (data.deletedCount > 0) {
              setServices(services.filter((s) => s._id !== id));
              Swal.fire("Deleted!", "Service has been deleted.", "success");
            } else {
              toast.error("Failed to delete service!");
            }
          })
          .catch(() => toast.error("Error deleting service!"));
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">
        My <span className="text-[#51ACFB]">Services</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">Service Name</th>
              <th className="py-3 px-4 border-b text-left">Category</th>
              <th className="py-3 px-4 border-b text-left">Price ($)</th>
              <th className="py-3 px-4 border-b text-left">Provider</th>
              <th className="py-3 px-4 border-b text-right pr-15">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service, index) => (
              <tr key={service._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{service.name}</td>
                <td className="py-2 px-4 border-b">{service.category}</td>
                <td className="py-2 px-4 border-b">{service.price}</td>
                <td className="py-2 px-4 border-b">{service.providerName}</td>
                <td className="py-2 px-4 border-b text-right">
                  <div className="flex justify-end gap-2">
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
    </div>
  );
};

export default MyServices;
