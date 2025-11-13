import React, { useState, useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContext";

const ServiceDetails = () => {
  const data = useLoaderData();
  const service = data.result;

  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const navigate = useNavigate();

  //
  useEffect(() => {
    document.title = "Service-Details | Home-hero";
  }, []);

  //
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
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

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

  //
  const isProvider = user?.email === service.providerEmail;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          {/* Image */}
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={service.image}
              alt={service.name}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {service.name}
            </h1>

            <div className="badge badge-lg badge-outline text-[#51ACFB] border-[#5184af] font-medium">
              {service.category}
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {service.description}
            </p>

            <p className="text-lg font-semibold text-gray-700">
              💰 Price: ${service.price}
            </p>

            <p className="text-sm text-gray-500">
              👤 Provider: {service.providerName} <br />
              📧 {service.providerEmail}
            </p>

            {/* */}
            <button
              onClick={() => {
                if (isProvider) {
                  toast.error("You cannot book your own service!");
                  return;
                }
                setModalOpen(true);
              }}
              disabled={isProvider}
              className={`btn text-white border-0 mt-6 btn-neutral border-none text-lg w-full ${
                isProvider
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#51ACFB] hover:bg-blue-600"
              }`}
            >
              Book Now
            </button>

            {/**/}
            {modalOpen && (
              <div className="modal modal-open">
                <div className="modal-box">
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
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    {/* User Email */}
                    <div>
                      <label className="block mb-1 font-medium">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
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
                    className="btn btn-outline mt-4"
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
    </div>
  );
};

export default ServiceDetails;
