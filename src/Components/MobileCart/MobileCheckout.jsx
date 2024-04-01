import React from "react";
import styles from "../../Pages/Checkout/Checkout.module.css";
import MobileFooter from "../MobileFooter/MobileFooter";
import backArrow from "../../assets/backArrow.png";
import logo from "../../assets/logo.png";
import Line2 from "../../assets/Line2.png";
const MobileCheckout = ({
  handleBack,
  creatorName,
  setAddress,
  setPaymentMode,
  cartProducts,
  isLoggedIn,
  setIsLoggedIn,
  selectedImageIndex,
  setSelectedImageIndex,
  handleSetProperties,
  showName,
  showColor,
  totalMrp,
  handlePlaceOrder,
}) => {
  return (
    <>
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
                <div className={styles.address1}>
                  <div className={styles.address}>
                    <textarea
                      placeholder="Type your Address here"
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.line}>
              <img src={Line2} alt="line" />
            </div>
            <div className={styles.paymentDiv1}>
              <div className={styles.listnumber}>2. Payment method</div>
              <div className={styles.paymentMode1}>
                <div className={styles.fieldContainer}>
                  <select onChange={(e) => setPaymentMode(e.target.value)}>
                    <option value="">Mode of Payment</option>
                    <option value="bydelivery">Pay on delivery</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
              </div>
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
                      />
                    </div>
                  ))}
                </div>
                <div style={{ marginLeft: "5%" }}>
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
            <div className={styles.placeOrderBox1}>
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
                <div className={styles.orderTotal}>₹ {totalMrp + 45}.00</div>
              </div>
            </div>
            <div className={styles.orderbutton1}>
              <button onClick={handlePlaceOrder}>Place your order</button>
            </div>
          </div>
        </div>

        <MobileFooter
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          state={"invoice"}
        />
      </div>
    </>
  );
};

export default MobileCheckout;
