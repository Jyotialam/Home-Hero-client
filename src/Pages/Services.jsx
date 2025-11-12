import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router';
import ServiceCard from '../Components/ServiceCard';

const Services = () => {
    const data = useLoaderData()
      useEffect(() => {
        document.title = "Services | Home-hero";
      }, []);
    return (
        <div className='w-11/12 mx-auto'>
           <div className="text-2xl text-center font-bold"> All Services</div>
      <p className=" text-center mb-10 ">Explore Available Services.</p>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
         {data.map(service => <ServiceCard key={service._id} service={service}/>)}
      </div>
        </div>
    );
};

export default Services;