import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ViewCart.module.css";
import cart from "../../assets/cart.png";

const ViewCart = ({ isLoggedIn, cartItemCount }) => {
  const { userId } = useParams();
  const [cartItemCount1, setCartItemCount1] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItem = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(
            `https://musicart-backend-zxey.onrender.com/auth/${userId}/cartItem`,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          setCartItemCount1(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    if (!cartItemCount) {
      fetchCartItem();
    }
  }, [userId, isLoggedIn, cartItemCount]);
  
  const handleviewCart =()=>{
    navigate(`/mycart/${userId}`);
  }
  
  return isLoggedIn ? (
    <div className={styles.viewCart} onClick={()=>handleviewCart()}>
      <div>
        <img src={cart} alt="cart" style={{ width: "20px", height: "20px" }} />
      </div>
      <div>View Cart {cartItemCount ? cartItemCount : cartItemCount1}</div>
    </div>
  ) : null;
};

export default ViewCart;

