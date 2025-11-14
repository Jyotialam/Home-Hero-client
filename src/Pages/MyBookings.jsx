import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewModal, setReviewModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    document.title = "My Bookings | HomeHero";
  }, []);

  // Fetch bookings
  useEffect(() => {
    if (!user) return;

    fetch(`https://home-hero-server-virid.vercel.app/my-bookings?email=${user.email}`)
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-xl">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-xl text-gray-900 dark:text-gray-100">
        Please login to view your bookings.
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-xl text-gray-900 dark:text-gray-100">
        You haven’t booked any services yet.
      </div>
    );

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
            if (data.result?.deletedCount > 0) {
              setBookings(bookings.filter((b) => b._id.toString() !== id));
              Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
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

  const handleOpenReview = (booking) => {
    setCurrentBooking(booking);
    setRating("");
    setComment("");
    setReviewModal(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error("Rating and comment are required!");
      return;
    }

    try {
      const res = await fetch(
        `https://home-hero-server-virid.vercel.app/services/${currentBooking.serviceId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: user.email,
            userName: user.displayName || "Anonymous",
            rating,
            comment,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Review submitted successfully!");
        setReviewModal(false);
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error!");
    }
  };

  return (
    <div className="w-11/12 mx-auto p-4 md:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-gray-100">
        My <span className="text-[#51ACFB]">Bookings</span>
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {["#", "Service Name", "Category", "Provider", "Price ($)", "Review", "Actions"].map(
                (head) => (
                  <th
                    key={head}
                    className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left text-gray-900 dark:text-gray-200"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{booking.serviceName}</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{booking.category}</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{booking.providerName}</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{booking.price}</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-center">
                  {booking.review ? (
                    <span className="text-green-500 font-semibold">Submitted</span>
                  ) : (
                    <button
                      onClick={() => handleOpenReview(booking)}
                      className="btn btn-sm bg-[#51ACFB] text-white hover:bg-blue-600 transition-colors duration-200"
                    >
                      Add Review
                    </button>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-right">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {bookings.map((booking, index) => (
          <div
            key={booking._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md"
          >
            <p className="text-gray-900 dark:text-gray-100 font-semibold">
              <span className="text-[#51ACFB]">#{index + 1}</span> {booking.serviceName}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Category:</span> {booking.category}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Provider:</span> {booking.providerName}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Price:</span> ${booking.price}
            </p>
            <div className="flex gap-2 mt-2">
              {booking.review ? (
                <span className="text-green-500 font-semibold flex-1 text-center">Submitted</span>
              ) : (
                <button
                  onClick={() => handleOpenReview(booking)}
                  className="btn btn-sm bg-[#51ACFB] text-white hover:bg-blue-600 flex-1 transition-colors duration-200"
                >
                  Add Review
                </button>
              )}
              <button
                onClick={() => handleCancel(booking._id)}
                className="btn btn-sm bg-red-500 text-white hover:bg-red-600 flex-1 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Review for {currentBooking.serviceName}
            </h2>
            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn w-full bg-[#51ACFB] text-white hover:bg-blue-600 transition-colors duration-200"
              >
                Submit Review
              </button>
            </form>
            <button
              className="btn btn-outline mt-4 w-full"
              onClick={() => setReviewModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
