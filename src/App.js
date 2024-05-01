import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import AddProducts from "../src/components/AddProducts";
import Auth from "../src/components/Auth";
import ProductContent from "./components/ProductContent";


const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth setIsAuth={setIsAuth} />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/productcontent/:id" element={<ProductContent />} />
      </Routes>
    </Router>
  );
};

export default App;