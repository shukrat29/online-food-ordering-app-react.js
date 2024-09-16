import "./App.css";
import Body from "./components/Body";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";

function App() {
  return (
    <div className="app flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
