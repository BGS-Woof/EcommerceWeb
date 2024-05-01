import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/FireBaseConfig";

const Products = ({ handleClick }) => {
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

  return (
    <div className="products-container">
      {products.map((product, index) => (
        <div key={index} className="product-link">
          <div className="product-box">
            <img
              className="product-img"
              src={product.productImg}
              alt={product.productName}
            />
            <div className="product-details">
              <h2 className="product-title">{product.productName}</h2>
              <p className="product-price">{product.productPrice}$</p>
              <button
                className="btn btn-success btn-md cart_btn"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleClick(product); 
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;