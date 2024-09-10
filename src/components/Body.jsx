import RestaurantCard from "./RestaurantCard";

import { resList } from "../utils/mockData";

const Body = () => {
  return (
    <>
      <div className="search">Search</div>

      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard resData={restaurant} />
        ))}
      </div>
    </>
  );
};

export default Body;
