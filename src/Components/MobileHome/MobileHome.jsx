import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./MobileHome.module.css";
import cart1 from "../../assets/cart1.png";
const MobileHome = ({ products, setCartItemCount, isLoggedIn }) => {
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
    <div className={styles.mobileContainer}>
      <div className={styles.productContainer}>
        {products.map((product) => (
          <div key={product._id} className={styles.product}>
            <div className={styles.imageContainer}>
              <img
                src={product.images[0].image1}
                alt="imagesample"
                onClick={() => handleViewProduct(product._id)}
              />
            </div>
            <div className={styles.details} style={{ marginTop: "10px" }}>
              {product.product_name}
            </div>
            <div className={styles.details}>Price - ₹{product.price}</div>
            <div className={styles.details}>
              {product.color} | {product.type} headphone
            </div>

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
        ))}
      </div>
    </div>
  );
};

export default MobileHome;
