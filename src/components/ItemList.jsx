import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  console.log(items);

  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    // dispatch an action
    // here inside addItem("piza") pizza is action.payload which will go to cartSlice page inside reducer function
    dispatch(addItem(item));
  };
  return (
    <div>
      {items.map((item) => (
        <div className="flex">
          <div
            key={item.card.info.id}
            className="p-2 m-2 border-gray-200 border-b-2 text-left w-9/12"
          >
            <div>
              <span>{item.card.info.name}</span>
              <span> -₹{item.card.info.price / 100}</span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 ">
            <button
              className="p-1 bg-black text-white rounded-lg absolute shadow-lg m-auto"
              onClick={() => handleAddItem(item)}
            >
              Add +
            </button>
            <img
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                item.card.info.imageId
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
