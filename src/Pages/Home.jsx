// import { useLoaderData } from "react-router";
// import Banner from "../../components/Banner";

import { useEffect } from "react";
import Banner from "../Components/Banner";
import { useLoaderData } from "react-router";
import ServiceCard from "../Components/ServiceCard";
import CustomerExperience from "../Components/CustomerExperience";
import MeetOurTeam from "../Components/MeetOurTeam";

const Home = () => {
  const data = useLoaderData();
  const limitedServices = data.slice(0, 6);

  // console.log(data)
  useEffect(() => {
    document.title = "Home | Home-hero";
  }, []);
  return (
    <div>
      <Banner />
      {/* cards */}
      <div className="w-11/12 mx-auto mt-20">
        <div className="text-4xl text-center font-bold mb-20">
          <span className="text-[#51ACFB]"> Services</span>  You may need!
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
          {limitedServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
      {/* testimonials */}
      <CustomerExperience/>
      <MeetOurTeam/>
    </div>
  );
};

export default Home;
