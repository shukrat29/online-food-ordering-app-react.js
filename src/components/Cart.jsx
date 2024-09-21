import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="text-center m-3 p-4">
      <h1 className="text-xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className="p-1 m-1 text-white bg-black rounded-lg"
          onClick={handleClearCart}
        >
          Clear cart
        </button>
        {cartItems == 0 && <h1>Cart is Empty. Add items to the cart.</h1>}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
