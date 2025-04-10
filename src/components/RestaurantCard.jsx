import { MdStarBorder } from "react-icons/md";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData?.info;

  return (
    <div className="res-card bg-white rounded-lg shadow-md overflow-hidden w-72 h-80 flex flex-col transition-transform transform hover:scale-105">
      <img
        className="w-full h-40 object-cover rounded-lg"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          cloudinaryImageId
        }
        alt={name}
      />
      <div className="p-4 flex flex-col flex-1 justify-between">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
        <h4 className="text-sm text-gray-500 truncate">
          {cuisines.join(", ")}
        </h4>
        <div className="flex items-center gap-1 text-green-600 font-semibold">
          <MdStarBorder className="text-green-700" />
          <span>{avgRating} stars</span>
        </div>
        <p className="text-gray-600 text-sm">{costForTwo}</p>
        <p className="text-gray-500 text-xs">{sla.slaString}</p>
      </div>
    </div>
  );
};

// Higher Order Component
export const RestaurantCardWithVegLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-2 left-2 bg-green-700 text-white px-2 py-1 text-xs rounded-md">
          Veg Restaurant
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
