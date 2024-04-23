import React, { useEffect, useState } from "react";

const Cart = ({ cart, setCart, handleChange }) => {
  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.amount * item.productPrice, 0);
  };

  const [price, setPrice] = useState(getTotalPrice());

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
  };

  useEffect(() => {
    setPrice(getTotalPrice());
  }, [cart]);

  return (
    <article className="cart-container container">
      {cart?.map((item) => (
        <div className="cart_box" key={item.id}>
          <img
            src={item.productImg}
            alt={item.productName}
            className="cart-item-image"
          />
          <div className="cart-item-details">
            <p className="cart-item-name">{item.productName}</p>
            <div className="cart-item-buttons">
              <button
                className="cart-item-button"
                onClick={() => handleChange(item, +1)}
              >
                +
              </button>
              <p>{item.amount > 0 ? item.amount : 0}</p>
              <button
                className="cart-item-button"
                onClick={() => handleChange(item, -1)}
              >
                -
              </button>
            </div>
            <div className="cart-item-price">
              <span>{item.productPrice}</span>
              <button
                className="cart-item-remove"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      {price > 0 && (
        <div className="cart-total">
          <span>Total price: </span>
          <span>$ {price}</span>
        </div>
      )}
    </article>
  );
};

export default Cart;
