import React, { useState } from "react";
import { db, storage } from "../config/FireBaseConfig"; // Assuming you have Firebase Storage configured as well
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Imports for Firebase Storage

export const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [productImgUrl, setProductImgUrl] = useState(""); // To store the URL of the uploaded image
  const [productDesc, setProductDesc] = useState("");
  const [error, setError] = useState("");

  const types = ["image/png", "image/jpeg"]; // Image types

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  // Reference to the "products" collection
  const productsCollectionRef = collection(db, "products");

  // Add product to Firestore
  const addProducts = async (event) => {
    event.preventDefault(); // Prevent form submission default behavior
    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `productImages/${productImg.name}`);
      await uploadBytes(storageRef, productImg);

      // Get download URL of the uploaded image
      const imgUrl = await getDownloadURL(storageRef);

      // Add product to Firestore with image URL
      await addDoc(productsCollectionRef, {
        productName,
        productPrice,
        productImg: imgUrl, // Store the image URL
        productDesc,
      });
      console.log("Product added successfully!");
      // Clear form fields after successful addition
      setProductName("");
      setProductPrice(0);
      setProductImg(null);
      setProductImgUrl("");
      setProductDesc("");
    } catch (error) {
      console.error("Error adding product: ", error);
      setError("Error adding product. Please try again.");
    }
  };

  return (
    <div className="container">
      <br />
      <h2>ADD PRODUCTS</h2>
      <hr />
      <form autoComplete="off" className="form-group" onSubmit={addProducts}>
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <br />
        <label htmlFor="product-price">Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <br />
        <label htmlFor="product-desc">Product Desc</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setProductDesc(e.target.value)}
          value={productDesc}
        />
        <br />
        <label htmlFor="product-img">Product Image</label>
        <input
          type="file"
          className="form-control"
          id="file"
          required
          onChange={productImgHandler}
        />
        <br />
        <button type="submit" className="btn btn-success btn-md mybtn">
          ADD
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};

export default AddProducts;