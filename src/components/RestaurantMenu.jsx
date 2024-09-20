// import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { FaChevronDown } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);

  //   In React, useParams is a hook from the React Router library that allows you to access URL parameters in a component. When a URL has dynamic segments, useParams can extract those segments, allowing you to use them in your component logic.
  // If the user navigates to /product/123, the id parameter will be 123, and useParams will allow you to access it inside your component.
  //   In the example below, each restaurant's id is being extracted.
  const { resId } = useParams();

  // Custom Hooks
  const resInfo = useRestaurantMenu(resId);

  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  // const fetchMenu = async () => {
  //   const data = await fetch(
  //     "https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.960059122809971&lng=77.57337538383284&restaurantId=" +
  //       resId +
  //       "&catalog_qa=undefined&submitAction=ENTER"
  //   );
  //   const json = await data.json();

  //   console.log(json);
  //   setResInfo(json.data);
  // };

  if (resInfo == null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  // title- Recommended
  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
  console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
  // Categories
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="menu text-center">
      <h1 className="font-semibold">{name}</h1>
      <p>
        {cuisines.join(",")} - {costForTwoMessage}
      </p>

      {/* categories accordions */}

      {categories.map((category) => (
        <RestaurantCategory
          key={category.card.card.title}
          data={category?.card?.card}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
