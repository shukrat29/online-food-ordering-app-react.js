import "./App.css";
import Body from "./components/Body";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { lazy, Suspense, useEffect } from "react";
import UserContext from "./utils/UserContext";
import { useState } from "react";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const Grocery = lazy(() => import("./components/Grocery"));

function App() {
  // Authentication
  const [userName, setUserName] = useState();
  useEffect(() => {
    // Make an API nd send username and password
    const data = {
      name: "Shukra Tamang",
    };
    setUserName(data.name);
  }, []);
  return (
    <Provider store={appStore}>
      <div className="app flex flex-col min-h-screen">
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Body />} />

              <Route
                path="/grocery"
                element={
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <Grocery />
                  </Suspense>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </main>
          <Footer />
        </UserContext.Provider>
      </div>
    </Provider>
  );
}

export default App;
