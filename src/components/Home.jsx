import React, { useState } from "react";
import NavBar from "./NavBar";
import Products from "./Products";
import Cart from "./Cart"; // Import the Cart component

const Home = () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleClickProduct = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }
    setCart([...cart, { ...item, amount: 1 }]);
  };

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id) ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount += d;

    if (tempArr[ind].amount === 0) tempArr[ind].amount = 1;
    setCart([...tempArr]);
  };

  return (
    <div className="container-fluid">
      <NavBar size={cart.length} setShow={setShow} />
      {show ? (
        <Products handleClick={handleClickProduct} />
      ) : (
        <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
      )}
      {warning && (
        <div className="warning">Item is already added to your cart!</div>
      )}
    </div>
  );
};

export default Home;