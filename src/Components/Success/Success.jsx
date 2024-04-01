import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Success.module.css";
import Footer from "../Footer/Footer";
import logo from "../../assets/logo.png";
import success from "../../assets/success.png";
import MobileFooter from "../MobileFooter/MobileFooter";
const Success = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const handleBack = () => {
    navigate(`/${userId}`);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      if (window.matchMedia("(max-width: 500px)").matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <div className={styles.container}>
      {!isMobile ? (
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.name}>Musicart</div>
        </div>
      ) : (
        <div className={styles.mobileNavbar}>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.headline1}>Musicart</div>
        </div>
      )}
      <div className={styles.mainbody}>
        <div className={styles.box}>
          <div className={styles.success}>
            <img src={success} alt="success" />
          </div>
          <div className={styles.ordermessage}>
            Order is placed successfully!
          </div>
          <div className={styles.point}>
            You will be receiving a confirmation email with order details
          </div>
          <div className={styles.back}>
            <button onClick={handleBack}>Go back to Home page</button>
          </div>
        </div>
      </div>
      {!isMobile ? <Footer /> : <MobileFooter isLoggedIn={true} />}
    </div>
  );
};

export default Success;
