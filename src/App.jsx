import "./App.css";
import Body from "./components/Body";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
