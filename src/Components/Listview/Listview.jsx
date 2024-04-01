import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Listview.module.css";
import cart1 from "../../assets/cart1.png";
const Listview = ({ products, setCartItemCount, isLoggedIn }) => {
  const { userId } = useParams();
  const navigate2 = useNavigate();
  const handleAddToCart = async (productId) => {
    try {
      await axios.put(
        `https://musicart-backend-zxey.onrender.com/auth/${userId}/${productId}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Item added to cart!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setCartItemCount((prevCount) => prevCount + 1);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };
  const handleViewProduct = (productId) => {
    if (isLoggedIn) {
      navigate2(`/product/${userId}/${productId}`);
    } else {
      navigate2(`/product/${productId}`);
    }
  };
  return (
    <div className={styles.productContainer}>
      {products.map((product) => (
        <div key={product._id} className={styles.product}>
          <div className={styles.imageContainer}>
            <img
              id={styles.image}
              src={product.images[0].image1}
              alt="imagesample"
            />
            {isLoggedIn ? (
              <div className={styles.cartdiv}>
                <img
                  src={cart1}
                  alt="cart"
                  style={{ position: "absolute", left: "10%", top: "10%" }}
                  onClick={() => handleAddToCart(product._id)}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.detailContainer}>
            <div className={styles.pname}>{product.product_name}</div>
            <div className={styles.details}>Price - ₹{product.price}</div>
            <div className={styles.details}>
              {product.color} | {product.type} headphone
            </div>
            <div className={styles.details}>{product.about}</div>
            <div className={styles.detail}>
              <button onClick={() => handleViewProduct(product._id)}>
                Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listview;
