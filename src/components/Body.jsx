import RestaurantCard from "./RestaurantCard";

// import { resList } from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  // state variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetching data from swiggy from title= Top restaurant chains in Bangalore
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.960059122809971&lng=77.57337538383284&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    // Optional Chaining

    setListOfRestaurants(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestaurant(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };
  // Conditional Rendering

  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="filter">
        {/* Search Restaurant by typing text(name) */}
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
              // Filter the restaurant cards and update the UI
              // searchText
              const filteredRestaurantsBySearchText = listOfRestaurants.filter(
                (res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurantsBySearchText);
            }}
          >
            Search
          </button>
        </div>

        {/* Filter Top Rated Restaurants having more than 4.5 stars */}
        <button
          className="filter-btn"
          onClick={() => {
            //  filter logic here
            const topRatedRestaurantsList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            setFilteredRestaurant(topRatedRestaurantsList);
          }}
        >
          <h3 className="text-lg font-semibold">
            Top Rated Restaurants (&gt;4.5 stars)
          </h3>
        </button>
      </div>

      {/* Restaurants container */}
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Body;
