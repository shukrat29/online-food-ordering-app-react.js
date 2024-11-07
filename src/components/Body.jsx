import RestaurantCard, { RestaurantCardWithVegLabel } from "./RestaurantCard";
import useOnlineStatus from "../customHooks/useOnlineStatus";

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const UpdatedRestaurantCardWithVegLabel =
    RestaurantCardWithVegLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.960059122809971&lng=77.57337538383284&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);

    setListOfRestaurants(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );

    setFilteredRestaurant(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus == false)
    return <h1>Please check your internet connection</h1>;

  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="p-3">
      <div className="filter">
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0">
          <div className="search">
            <input
              type="text"
              className="search-box"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              onClick={() => {
                const filteredRestaurantsBySearchText =
                  listOfRestaurants.filter((res) =>
                    res.info.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                setFilteredRestaurant(filteredRestaurantsBySearchText);
              }}
            >
              Search
            </button>
          </div>

          <button
            className="filter-btn"
            onClick={() => {
              const topRatedRestaurantsList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.5
              );
              setFilteredRestaurant(topRatedRestaurantsList);
            }}
          >
            <h3 className="text-lg font-semibold">Top Rated Restaurants</h3>
          </button>
        </div>
      </div>

      {/* Restaurants container */}
      <div className="res-container flex flex-col p-3 justify-center items-center sm:flex-row flex-wrap space-y-3 sm:space-x-3">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.veg ? (
              <UpdatedRestaurantCardWithVegLabel resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} className="" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
