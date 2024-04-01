import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import mobile from "../../assets/mobile.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const {productId } = useParams();
  const navigate1 = useNavigate();

  const navigateLogin = (e) => {
    e.preventDefault();
    navigate1("/login");
  };
  const navigateSignUp = (e) => {
    e.preventDefault();
    navigate1("/register");
  };
  const navigateLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    sessionStorage.removeItem("isValidSession");
    setIsLoggedIn(false);
    if(productId){
      navigate1(`/product/${productId}`)
    }else{
      navigate1("/");
    }
    
  };
  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        
        <div className={styles.navbar}>
        <div className={styles.mobile}><div><img src={mobile} alt="mobile"/></div><div>912121131313</div></div>
      <div>Get 50% off on selected items &nbsp; | &nbsp;   Shop Now </div>
      <div onClick={navigateLogout} className={styles.logout}>Logout</div>
    </div>
      ) : (
        <div className={styles.navbar}>
          <div className={styles.mobile}><div><img src={mobile} alt="mobile"/></div><div>912121131313</div></div>
          <div>Get 50% off on selected items  |   Shop Now </div>
          <div className={styles.login}><div onClick={navigateLogin}>Login</div>|<div onClick={navigateSignUp}>Signup</div></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
