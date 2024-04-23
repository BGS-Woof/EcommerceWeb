import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/FireBaseConfig";

const ProductContent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productDocRef = doc(db, "products", id);
        const productDocSnapshot = await getDoc(productDocRef);
        if (productDocSnapshot.exists()) {
          setProduct({
            ...productDocSnapshot.data(),
            id: productDocSnapshot.id,
          });
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
  }, [id]);

  return (
    <div className="productcontent_container">
      {product ? (
        <div className="productcontent_box">
          <img
            className="productcontent_img"
            src={product.productImg}
            alt={product.productName}
          />
          <p className="productcontent_desc">{product.productDesc}</p>
          <button
            className="btn btn-success btn-md"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            Add to cart
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductContent;