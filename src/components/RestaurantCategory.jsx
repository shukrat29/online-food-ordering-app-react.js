import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data }) => {
  const [showItems, setShowItems] = useState(false);
  const handleClick = () => {
    setShowItems(!showItems);
  };
  console.log(data);
  return (
    <div>
      {/* Accordion Header */}
      <div className=" font-semibold items-center bg-gray-50 shadow-lg p-4 w-6/12 m-auto my-4 ">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title}({data.itemCards.length})
          </span>
          <span>
            <MdOutlineKeyboardArrowDown />
          </span>
        </div>
        {showItems && <ItemList items={data.itemCards} />}
      </div>

      {/* Accordion Body */}
    </div>
  );
};

export default RestaurantCategory;
