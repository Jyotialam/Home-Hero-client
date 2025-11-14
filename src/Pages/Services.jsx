import React, { useEffect, useState } from "react";
import ServiceCard from "../Components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const fetchServices = async (minPrice = "", maxPrice = "") => {
    let url = "https://home-hero-server-virid.vercel.app/services";

    if (minPrice && maxPrice) {
      url += `?min=${minPrice}&max=${maxPrice}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    document.title = "Services | Home-hero";
    fetchServices();
  }, []);

  const handleFilter = () => {
    if (!min || !max) {
      fetchServices();
      return;
    }
    fetchServices(min, max);
  };

  return (
    <div className="w-11/12 mx-auto">

      {/* HEADING */}
      <div className="text-4xl my-10 text-center font-bold">
        All <span className="text-[#51ACFB]">Services</span>
      </div>

      {/* PRICE FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="number"
          placeholder="Min Price"
          className="input input-bordered w-48"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="input input-bordered w-48"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />

        <button
          onClick={handleFilter}
          className="btn bg-[#51ACFB] hover:bg-blue-600 text-white"
        >
          Filter
        </button>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
