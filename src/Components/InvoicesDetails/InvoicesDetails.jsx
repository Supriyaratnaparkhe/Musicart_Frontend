import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./InvoicesDetails.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import logo from "../../assets/logo.png";
import Line2 from "../../assets/Line2.png";
import Spinner from "../../Components/Spinner/Spinner";
import backArrow from "../../assets/backArrow.png";
import MobileFooter from "../MobileFooter/MobileFooter";

const InvoicesDetails = () => {
  const { userId, invoiceId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [totalMrp, setTotalMrp] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState();
  const [showName, setShowName] = useState("");
  const [showColor, setShowColor] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [creatorName, setCreatorName] = useState("");
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
      navigate(`/${userId}`);
    } else {
      navigate("/");
    }
  };
  const handleSetProperties = (color, p_name) => {
    setShowColor(color);
    setShowName(p_name);
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `https://musicart-backend-zxey.onrender.com/auth/invoicedetail/${userId}/${invoiceId}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setAddress(response.data.address);
        setCreatorName(response.data.orderPerson);
        setPaymentMode(response.data.paymentMode);
        setCartProducts(response.data.addedItems);
        setTotalMrp(response.data.totalAmount);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [userId, invoiceId]);

  return (
    <>
      {!isMobile ? (
        <div>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          {!loading ? (
            <div className={styles.container}>
              <div className={styles.header}>
                <div className={styles.left}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div className={styles.logo}>
                      <img src={logo} alt="logo" />
                    </div>
                    <div className={styles.name}>Musicart</div>
                  </div>
                  <div className={styles.home}>Home / Invoices</div>
                </div>
              </div>
              <div className={styles.back}>
                <button onClick={() => handleBack()}>Back to Home</button>
              </div>
              <div className={styles.checkout}>
                <div className={styles.headline}>Invoice</div>
              </div>
              <div className={styles.bodyC}>
                <div className={styles.leftContainer}>
                  <div className={styles.deliveryDiv}>
                    <div className={styles.listnumber}>1. Delivery address</div>
                    <div className={styles.fieldContainer}>
                      <div className={styles.ordername}>{creatorName}</div>
                      <div className={styles.address}>{address}</div>
                    </div>
                  </div>
                  <div className={styles.line}>
                    <img src={Line2} alt="line" />
                  </div>
                  <div className={styles.paymentDiv}>
                    <div className={styles.listnumber}>2. Payment method</div>
                    <div className={styles.fieldContainer}>
                      <div className={styles.paymentMode}>{paymentMode}</div>
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
                              selectedImageIndex === index &&
                              styles.selectedImage
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
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className={styles.showname}>{showName}</div>
                        <div className={styles.showcolor}>
                          Color: {showColor}
                        </div>
                        <div className={styles.estimate}>
                          Estimated delivery : Monday — FREE Standard Delivery
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.line}>
                    <img src={Line2} alt="line" />
                  </div>
                </div>
                <div className={styles.rightContainer}>
                  <div className={styles.placeOrderBox}>
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
          ) : (
            loading && <Spinner />
          )}
          <Footer />
        </div>
      ) : (
        <>
          {!loading ? (
            <div className={styles.container1}>
              <div className={styles.mobileNavbar}>
                <div>
                  <img src={logo} alt="logo" />
                </div>
                <div className={styles.headline1}>Musicart</div>
              </div>
              <div className={styles.backbut} onClick={() => handleBack()}>
                <img src={backArrow} alt="back" style={{ marginTop: "15px" }} />
              </div>
              <div className={styles.header1}>Invoices</div>
              <div className={styles.bodyC1}>
                <div style={{ width: "90%" }}>
                  <div>
                    <div className={styles.listnumber}>1. Delivery address</div>
                    <div>
                      <div className={styles.ordername1}>{creatorName}</div>
                      <div className={styles.address1}>{address}</div>
                    </div>
                  </div>
                  <div className={styles.line}>
                    <img src={Line2} alt="line" />
                  </div>
                  <div className={styles.paymentDiv1}>
                    <div className={styles.listnumber}>2. Payment method</div>
                    <div className={styles.paymentMode1}>{paymentMode}</div>
                  </div>
                  <div className={styles.line}>
                    <img src={Line2} alt="line" />
                  </div>
                  <div className={styles.reviewDiv1}>
                    <div className={styles.listnumber}>
                      3. Review items and delivery
                    </div>
                    <div className={styles.fieldContainer1}>
                      <div className={`${styles.gridComponent1}`}>
                        {cartProducts.map((productWithQuantity, index) => (
                          <div
                            key={index}
                            className={`${styles.productContainer} ${
                              selectedImageIndex === index &&
                              styles.selectedImage
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
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{ marginLeft: "5%" }}>
                        <div className={styles.showname}>{showName}</div>
                        <div className={styles.showcolor}>
                          Color: {showColor}
                        </div>
                        <div className={styles.estimate}>
                          Estimated delivery : Monday — FREE Standard Delivery
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.line}>
                    <img src={Line2} alt="line" />
                  </div>
                  <div className={styles.placeOrderBox}>
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
              <MobileFooter
                isLoggedIn={true}
                setIsLoggedIn={setIsLoggedIn}
                state={"invoice"}
              />
            </div>
          ) : (
            loading && <Spinner />
          )}
        </>
      )}
    </>
  );
};

export default InvoicesDetails;
