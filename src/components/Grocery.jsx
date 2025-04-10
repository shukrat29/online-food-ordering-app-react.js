import React, { useEffect, useState } from "react";
import axios from "axios";

const Grocery = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroceryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://simple-grocery-store-api.glitch.me/products"
        );

        setGroceryItems(response.data); // array of grocery products
        console.log(response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching grocery data:", err);
        setError("Failed to load grocery items.");
        setLoading(false);
      }
    };

    fetchGroceryData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">Loading grocery items...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Grocery Store</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groceryItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition-all"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded mb-3"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600 text-sm">
              {item.description || "Fresh and quality groceries."}
            </p>
            <p className="text-green-600 font-semibold mt-1">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grocery;
