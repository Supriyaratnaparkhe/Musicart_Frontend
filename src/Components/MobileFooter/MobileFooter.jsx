import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Mobilefooter.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Homelogo from "../../assets/Homelogo.png";
import loginlogo from "../../assets/loginlogo.png";
import cartlogo from "../../assets/cartlogo.png";
import invoicelogo from "../../assets/invoicelogo.png";

const MobileFooter = ({ isLoggedIn, setIsLoggedIn, state, cartItemCount }) => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState(state);
  const [cartItemCount1, setCartItemCount1] = useState(0);
  const navigate1 = useNavigate();

  const handleHome = (e) => {
    e.preventDefault();
    setActiveTab("home");
    if (isLoggedIn) {
      navigate1(`/${userId}`);
    } else {
      navigate1("/");
    }
  };
  const navigateLogin = (e) => {
    e.preventDefault();
    setActiveTab("login");
    navigate1("/login");
  };
  const navigateLogout = (e) => {
    e.preventDefault();
    setActiveTab("home");
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    sessionStorage.removeItem("isValidSession");
      navigate1("/");
  };
  const handleCart = (e) => {
    e.preventDefault();
    setActiveTab("cart");
    if (isLoggedIn) {
      navigate1(`/mycart/${userId}`);
    } else {
      navigate1("/login");
    }
  };
  const handleInvoice = (e) => {
    e.preventDefault();
    setActiveTab("invoice");
    navigate1(`/invoices/${userId}`);
  };
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
  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <div className={styles.footer}>
          <div className={styles.box} onClick={handleHome}>
            <div
              className={`${activeTab === "home" ? styles.active : ""}`}
            ></div>
            <div className={styles.logoimage}>
              <img src={Homelogo} alt="logo" />
            </div>
            <div>Home</div>
          </div>
          <div className={`${styles.box} ${styles.cart}`} onClick={handleCart}>
            <div
              className={`${activeTab === "cart" ? styles.active : ""}`}
            ></div>
            <div className={styles.logoimage}>
              <img src={cartlogo} alt="logo" />
            </div>
            <div>Cart</div>
            <div className={styles.cartcount}>
              {cartItemCount ? cartItemCount : cartItemCount1}
            </div>
          </div>

          <div className={styles.box} onClick={handleInvoice}>
            <div
              className={`${activeTab === "invoice" ? styles.active : ""}`}
            ></div>
            <div className={styles.logoimage}>
              <img src={invoicelogo} alt="logo" />
            </div>
            <div>Invoice</div>
          </div>
          <div onClick={navigateLogout} className={styles.box}>
            <div
              className={`${activeTab === "logout" ? styles.active : ""}`}
            ></div>
            <div className={styles.logoimage}>
              <img src={loginlogo} alt="logo" />
            </div>
            <div>Logout</div>
          </div>
        </div>
      ) : (
        <div className={styles.footer}>
          <div className={styles.box} onClick={handleHome}>
            <div
              className={`${activeTab === "home" ? styles.active : ""}`}
            ></div>
            <div className={styles.logoimage}>
              <img src={Homelogo} alt="logo" />
            </div>
            <div>Home</div>
          </div>
          <div className={`${styles.box} ${styles.cart}`} onClick={handleCart}>
            <div
              className={`${activeTab === "cart" ? styles.active : ""}`}
            ></div>
            <div className={styles.logoimage}>
              <img src={cartlogo} alt="logo" />
            </div>
            <div>Cart</div>
          </div>
          <div onClick={navigateLogin} className={styles.box}>
            <div
              className={`${activeTab === "login" ? styles.active : ""}`}
            ></div>
            <div className={styles.logoimage}>
              <img src={loginlogo} alt="logo" />
            </div>
            <div>Login</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFooter;
