import { MdStarBorder } from "react-icons/md";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData?.info;

  return (
    <div className="res-card bg-zinc-100 rounded-lg">
      <img
        className="res-logo w-full h-60 object-cover rounded-lg"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          cloudinaryImageId
        }
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <h4 className="flex items-center">
        <MdStarBorder className="bg-green-700 rounded-full text-white" />
        {sla.slaString}
      </h4>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo}</h4>
    </div>
  );
};

// Higher Order Component
// input- RestaurantCard and return RestaurantCardWithVegLabel
// it does not change/modify anything of Original RestaurantCard it only adds or enhance

export const RestaurantCardWithVegLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-1 p-1 rounded-lg">
          Veg Restaurant
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
