import RestaurantCard from "./RestaurantCard";

// import { resList } from "../utils/mockData";
import { useEffect, useState } from "react";

const Body = () => {
  // state variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.960059122809971&lng=77.57337538383284&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    // console.log(json);
    setListOfRestaurants(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  return (
    <>
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            //  filter logic here
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            setListOfRestaurants(filteredList);
          }}
        >
          <h3 className="text-lg font-semibold">
            Top Rated Restaurants (&gt;4.5 stars)
          </h3>
        </button>
      </div>

      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </>
  );
};

export default Body;
