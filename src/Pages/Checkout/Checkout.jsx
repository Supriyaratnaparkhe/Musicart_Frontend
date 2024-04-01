import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styles from "./Checkout.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import logo from "../../assets/logo.png";
import Line2 from "../../assets/Line2.png";
import MobileCheckout from "../../Components/MobileCart/MobileCheckout";

const Checkout = () => {
  const location = useLocation();
  const { cartProducts, totalMrp } = location.state;
  const { userId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [showName, setShowName] = useState("");
  const [showColor, setShowColor] = useState("");
  const navigate = useNavigate();
  const creatorName = localStorage.getItem("UserName");
  const [selectedImageIndex, setSelectedImageIndex] = useState();
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

  const handleBack = () => {
    if (isLoggedIn) {
      navigate(`/mycart/${userId}`);
    } else {
      navigate("/");
    }
  };
  const handleSetProperties = (color, p_name) => {
    setShowColor(color);
    setShowName(p_name);
  };
  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        `https://musicart-backend-zxey.onrender.com/auth/${userId}`,
        {
          orderPerson: creatorName,
          address: address,
          paymentMode: paymentMode,
          totalAmount: totalMrp,
          addedItems: cartProducts,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      navigate(`/ordersuccess/${userId}`);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      {!isMobile ? (
        <div>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.left}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div className={styles.logo}>
                    <img src={logo} alt="logo" />
                  </div>
                  <div className={styles.name}>Musicart</div>
                </div>
                <div className={styles.home}>Home / Checkout</div>
              </div>
            </div>
            <div className={styles.back}>
              <button onClick={() => handleBack()}>Back to Cart</button>
            </div>
            <div className={styles.checkout}>
              <div className={styles.headline}>Checkout</div>
            </div>
            <div className={styles.bodyC}>
              <div className={styles.leftContainer}>
                <div className={styles.deliveryDiv}>
                  <div className={styles.listnumber}>1. Delivery address</div>
                  <div className={styles.fieldContainer}>
                    <div className={styles.ordername}>{creatorName}</div>
                    <div className={styles.address}>
                      <textarea
                        placeholder="Type your Address here"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.line}>
                  <img src={Line2} alt="line" />
                </div>
                <div className={styles.paymentDiv}>
                  <div className={styles.listnumber}>2. Payment method</div>
                  <div className={styles.fieldContainer}>
                    <select onChange={(e) => setPaymentMode(e.target.value)}>
                      <option value="">Mode of Payment</option>
                      <option value="bydelivery">Pay on delivery</option>
                      <option value="UPI">UPI</option>
                      <option value="Card">Card</option>
                    </select>
                  </div>
                </div>
                <div className={styles.line}>
                  <img src={Line2} alt="line" />
                </div>
                <div className={styles.reviewDiv}>
                  <div className={styles.listnumber}>
                    3. Review items and delivery
                  </div>
                  <div className={styles.fieldContainer}>
                    <div className={`${styles.gridComponent}`}>
                      {cartProducts.map((productWithQuantity, index) => (
                        <div
                          key={index}
                          className={`${styles.productContainer} ${
                            selectedImageIndex === index && styles.selectedImage
                          }`}
                          onClick={() => {
                            handleSetProperties(
                              productWithQuantity.product.color,
                              productWithQuantity.product.product_name
                            );
                            setSelectedImageIndex(index);
                          }}
                        >
                          <img
                            src={productWithQuantity.product.images[0].image1}
                            alt="product"
                            style={{ width: "70px", height: "70px" }}
                            onClick={() =>
                              handleSetProperties(
                                productWithQuantity.product.color,
                                productWithQuantity.product.product_name
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className={styles.showname}>{showName}</div>
                      <div className={styles.showcolor}>Color: {showColor}</div>
                      <div className={styles.estimate}>
                        Estimated delivery : Monday — FREE Standard Delivery
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.line}>
                  <img src={Line2} alt="line" />
                </div>
                <div className={styles.placeOrder}>
                  <div className={styles.orderbutton}>
                    <button
                      style={{ fontSize: "19px", width: "180px" }}
                      onClick={handlePlaceOrder}
                    >
                      Place your order
                    </button>
                  </div>
                  <div>
                    <div
                      className={styles.orderTotal}
                      style={{ fontSize: "19px" }}
                    >
                      Order Total: ₹ {totalMrp + 45}.00
                    </div>
                    <div className={styles.agree} style={{ fontSize: "13px" }}>
                      By placing your order, you agree to Musicart privacy
                      notice and conditions of use
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.rightContainer}>
                <div className={styles.placeOrderBox}>
                  <div className={styles.orderbutton}>
                    <button onClick={handlePlaceOrder}>Place your order</button>
                  </div>
                  <div className={styles.agree} style={{ marginTop: "10px" }}>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </div>
                  <div className={styles.smallline}>
                    <img src={Line2} alt="line2" />
                  </div>
                  <div className={styles.orderSummary}>
                    <div className={styles.summary}>Order Summary</div>
                    <div className={styles.divBox}>
                      <div className={styles.pricevalue}>Items: </div>
                      <div className={styles.pricevalue}>₹ {totalMrp}.00</div>
                    </div>
                    <div className={styles.divBox}>
                      <div className={styles.pricevalue}>Delivery: </div>
                      <div className={styles.pricevalue}>₹ 45.00</div>
                    </div>
                  </div>
                  <div className={styles.smallline}>
                    <img src={Line2} alt="line2" />
                  </div>
                  <div className={styles.divBox}>
                    <div className={styles.orderTotal}>Order Total :</div>
                    <div className={styles.orderTotal}>
                      ₹ {totalMrp + 45}.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <MobileCheckout
          handleBack={handleBack}
          creatorName={creatorName}
          setAddress={setAddress}
          setPaymentMode={setPaymentMode}
          cartProducts={cartProducts}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex}
          handleSetProperties={handleSetProperties}
          showName={showName}
          showColor={showColor}
          totalMrp={totalMrp}
          handlePlaceOrder={handlePlaceOrder}
        />
      )}
    </>
  );
};

export default Checkout;
