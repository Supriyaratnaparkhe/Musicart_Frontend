import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backArrow from "../../assets/backArrow.png";
import search from "../../assets/search.png";
import MobileFooter from "../../Components/MobileFooter/MobileFooter";
import styles from "../../Pages/ProductDetails/ProductDetails.module.css";
import "./Mobile.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
const MobileProduct = ({
  details,
  isLoggedIn,
  setIsLoggedIn,
  handleBuy,
  handleBack,
  handleAddToCart,
  cartItemCount,
  renderStars,
  image1st,
  image2nd,
  image3rd,
  image4th,
  productId,
}) => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    arrows: true,
  };
  const { userId } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (isLoggedIn) {
        navigate(`/${userId}`, { state: { searchq: searchValue } });
      } else {
        navigate("/", { state: { searchq: searchValue } });
      }
    }
  };
  return (
    <>
      {" "}
      <div>
        <div className={styles.headbar1}>
          <div className={styles.search1}>
            <input
              type="text"
              name="search"
              // value={filters.search}
              // onChange={handleFilterChange}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.searchbar1}
              placeholder="Search by Product Name"
            />
            <img
              src={search}
              alt="search"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
        </div>
        <div className={styles.backbut1} onClick={() => handleBack()}>
          <img src={backArrow} alt="back" style={{ marginTop: "15px" }} />
        </div>
        <div className={styles.container1}>
          <div className={styles.but1}>
            <button
              style={{ backgroundColor: "#FFB800" }}
              onClick={() => handleBuy()}
            >
              Buy Now
            </button>
          </div>
          <div className={styles.imageContainer1}>
            <Slider {...settings}>
              <div className={styles.image3}>
                <img src={image1st} alt="image1" />
              </div>
              <div className={styles.image3}>
                <img src={image2nd} alt="image2" />
              </div>
              <div className={styles.image3}>
                <img src={image3rd} alt="image3" />
              </div>
              <div className={styles.image3}>
                <img src={image4th} alt="image4" />
              </div>
            </Slider>
          </div>
          <div className={styles.detailContainer}>
            <div style={{ width: "100%" }}>
              <div className={styles.pname}>{details.product_name}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "2vh",
                }}
              >
                <div style={{ fontSize: "20px" }}>{renderStars()}</div>
                <div className={styles.review}>
                  ( {details.review} customer reviews)
                </div>
              </div>
              <div className={styles.about}>{details.about}</div>
              <div className={styles.price}>Price- ₹{details.price}</div>
              <div className={styles.color}>
                {details.color} | {details.type} headphone
              </div>
              <div className={styles.descr}>
                About this items
                <ul>
                  {details.description.map((item, index) => (
                    <li key={index}>{item.point}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.tag} style={{ marginTop: "-10px" }}>
                <span>Available</span> - {details.available}
              </div>
              <div className={styles.tag}>
                <span>Brand</span> - {details.company}
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <div className={styles.but1} style={{ width: "100%" }}>
                <button
                  style={{ backgroundColor: "#FFD600" }}
                  onClick={() => handleAddToCart(productId)}
                >
                  Add to Cart
                </button>
              </div>
              <div className={styles.but1} style={{ width: "100%" }}>
                <button
                  style={{ backgroundColor: "#FFB800" }}
                  onClick={() => handleBuy()}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        cartItemCount={cartItemCount}
      />
      <ToastContainer />
    </>
  );
};

export default MobileProduct;
