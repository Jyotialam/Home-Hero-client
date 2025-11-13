
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  const { name, image, category, description, _id,price,
providerEmail } = service;

  return (
    <div>
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <figure className="h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <span className="font-bold">{price}$</span>
          <div className="badge text-xs badge-xs text-white text-center bg-[#5184AF] ">
            {category}
          </div>
          <p>{providerEmail}</p>
          <p className="line-clamp-1">{description}</p>

          <div className="card-actions justify-between items-center mt-4">
            <div className="flex gap-4 text-sm text-base-content/60">
              
            </div>
            <Link
              to={`/service-details/${_id}`}
              className="bg-linear-to-r hover:from-blue-600 hover:to-blue-500 btn-sm btn text-white   btn-neutral border-none text-lg w-full bg-[#51ACFB]"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
