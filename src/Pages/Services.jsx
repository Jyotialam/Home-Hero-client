import React, { useEffect } from "react";
import { useLoaderData } from "react-router";
import ServiceCard from "../Components/ServiceCard";

const Services = () => {
  const data = useLoaderData();
  useEffect(() => {
    document.title = "Services | Home-hero";
  }, []);
  return (
    <div className="w-11/12 mx-auto">
      <div className="text-4xl my-10 text-center font-bold">
        {" "}
        All <span className="text-[#51ACFB]">Services</span>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
