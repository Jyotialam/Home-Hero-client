import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Bookings | HomeHero";
  }, []);

  useEffect(() => {
    if (!user) return;

    fetch(
      `https://home-hero-server-virid.vercel.app/my-bookings?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch bookings");
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        You haven’t booked any services yet.
      </div>
    );
  }

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://home-hero-server-virid.vercel.app/bookings/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.result.deletedCount > 0) {
              setBookings(bookings.filter((b) => b._id.toString() !== id));
              Swal.fire(
                "Cancelled!",
                "Your booking has been cancelled.",
                "success"
              );
            } else {
              toast.error("Failed to cancel booking!");
            }
          })
          .catch((err) => {
            toast.error("Error cancelling booking!");
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">
        My <span className="text-[#51ACFB]">Bookings</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">Service Name</th>
              <th className="py-3 px-4 border-b text-left">Category</th>
              <th className="py-3 px-4 border-b text-left">Provider</th>
              <th className="py-3 px-4 border-b text-left">Price ($)</th>
              <th className="py-3 px-4 border-b text-right pr-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{booking.serviceName}</td>
                <td className="py-2 px-4 border-b">{booking.category}</td>
                <td className="py-2 px-4 border-b">{booking.providerName}</td>
                <td className="py-2 px-4 border-b">{booking.price}</td>
                <td className="py-2 px-4 border-b text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      Cancel
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

export default MyBookings;
