import React, { useState, useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContext";

const ServiceDetails = () => {
  const data = useLoaderData();
  const service = data?.service;
  const [reviews, setReviews] = useState(service?.reviews || []);

  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Service-Details | HomeHero";
  }, []);

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-200">Service not found!</p>
      </div>
    );
  }

  const isProvider = user?.email === service.providerEmail;

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first!");
      return;
    }

    const bookingData = {
      userName: user.displayName || "Anonymous",
      userEmail: user.email,
      serviceId: service._id,
      price: service.price,
      serviceName: service.name,
      category: service.category,
      providerName: service.providerName,
      providerEmail: service.providerEmail,
      customerEmail: user.email,
      bookingDate,
    };

    try {
      const res = await fetch(
        "https://home-hero-server-virid.vercel.app/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Booking confirmed!");
        setModalOpen(false);
        navigate("/my-bookings");
      } else {
        toast.error("Booking failed!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Service Card */}
      <div className="card bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-6 lg:p-8">
          {/* Image */}
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={service.image}
              alt={service.name}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2 text-gray-800 dark:text-gray-100">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              {service.name}
            </h1>

            <div className="badge badge-lg badge-outline text-[#51ACFB] border-[#5184af] font-medium">
              {service.category}
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              {service.description}
            </p>

            <p className="text-lg font-semibold">
              💰 Price: ${service.price}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              👤 Provider: {service.providerName} <br />
              📧 {service.providerEmail}
            </p>

            {/* Booking Button */}
            <button
              onClick={() => setModalOpen(true)}
              disabled={isProvider}
              className={`btn text-white border-0 mt-4 md:mt-6 w-full text-lg ${
                isProvider
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#51ACFB] hover:bg-blue-600"
              }`}
            >
              {isProvider ? "Cannot Book Your Own Service" : "Book Now"}
            </button>

            {/* Booking Modal */}
            {modalOpen && (
              <div className="modal modal-open">
                <div className="modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <h2 className="text-2xl font-bold">{service.name}</h2>
                  <p>Price: ${service.price}</p>
                  <p>Provider: {service.providerName}</p>

                  <form onSubmit={handleBooking} className="mt-4 space-y-4">
                    {/* User Name */}
                    <div>
                      <label className="block mb-1 font-medium">Name</label>
                      <input
                        type="text"
                        value={user.displayName || "Anonymous"}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                      />
                    </div>

                    {/* User Email */}
                    <div>
                      <label className="block mb-1 font-medium">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                      />
                    </div>

                    {/* Booking Date */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Booking Date
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn mt-4 w-full text-white bg-[#51ACFB] hover:bg-blue-600"
                    >
                      Confirm Booking
                    </button>
                  </form>

                  <button
                    className="btn btn-outline mt-4 w-full"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Reviews
        </h2>
        {reviews.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No reviews yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="border p-3 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700"
              >
                <p className="font-semibold">{rev.userName}</p>
                <p>Rating: {rev.rating} / 5</p>
                <p>{rev.comment}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(rev.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
