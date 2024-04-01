import React, { useState } from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("UserName");
  const [showdiv, setShowdiv] = useState(false);
  const getInitials = () => {
    const initials = userName ? userName.toUpperCase().slice(0, 2) : "";
    return initials;
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    sessionStorage.removeItem("isValidSession");
    setIsLoggedIn(false);
    setShowdiv(false);
    navigate("/");
  };
  const toggalshow = () => {
    setShowdiv(!showdiv);
  };

  return isLoggedIn ? (
    <>
      <div className={styles.profile} onClick={toggalshow}>
        <div>{getInitials()}</div>
        {showdiv ? (
          <div className={styles.profileDiv}>
            <div className={styles.name}>
              <div>{userName}</div>
            </div>
            <div className={styles.logout} onClick={handleLogout}>
              <div>Logout</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  ) : null;
};

export default Profile;
