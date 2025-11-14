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

  // Open review modal
  const handleOpenReview = (booking) => {
    setCurrentBooking(booking);
    setRating("");
    setComment("");
    setReviewModal(true);
  };

  // Submit review
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
              <th className="py-3 px-4 border-b text-center">Review</th>
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
                <td className="py-2 px-4 border-b text-center">
                  {booking.review ? (
                    <span className="text-green-500 font-semibold">Submitted</span>
                  ) : (
                    <button
                      onClick={() => handleOpenReview(booking)}
                      className="btn btn-sm bg-[#51ACFB] text-white hover:bg-blue-600"
                    >
                      Add Review
                    </button>
                  )}
                </td>
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

      {/* Review Modal */}
      {reviewModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold">
              Review for {currentBooking.serviceName}
            </h2>
            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block mb-1 font-medium">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn w-full bg-[#51ACFB] text-white hover:bg-blue-600"
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
