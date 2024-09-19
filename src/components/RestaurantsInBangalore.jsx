import React, { useState, useEffect } from "react";

const RestaurantsInBangalore = () => {
  const [listOfRestaurantsInBangalore, setlistOfRestaurantsInBangalore] =
    useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetching data from swiggy from title= Restaurants with online food delivery in Bangalore
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.960059122809971&lng=77.57337538383284&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    // console.log(json);

    // Optional Chaining

    setlistOfRestaurantsInBangalore(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  return (
    <>
      <div className="res-container">
        {listOfRestaurantsInBangalore.length > 0 ? (
          listOfRestaurantsInBangalore.map((restaurant) => (
            <div
              className="ress-card bg-zinc-100 rounded-lg"
              key={restaurant.info.id}
            >
              <img
                className="res-logo w-full h-60 object-cover rounded-lg"
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                  restaurant.info.cloudinaryImageId
                }
              />
              <h2>{restaurant.info.name}</h2>
              <p>Cuisines: {restaurant.info.cuisines}</p>
              <p>Rating: {restaurant.info.avgRating} stars</p>
              <p>Price: {restaurant.info.costForTwo}</p>
            </div>
          ))
        ) : (
          <p>Loading restaurants...</p>
        )}
      </div>
    </>
  );
};

export default RestaurantsInBangalore;
