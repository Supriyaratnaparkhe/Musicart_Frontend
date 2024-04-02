import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import search from "../../assets/search.png";
import backArrow from "../../assets/backArrow.png";
import MobileFooter from "../../Components/MobileFooter/MobileFooter";
import styles from "../../Pages/MyCart/MyCart.module.css";
import NoItem from "../NoItem/NoItem";

const MobileCart = ({
  setCartProducts,
  totalMrp,
  handlePlaceOrder,
  isLoggedIn,
  setIsLoggedIn,
  cartProducts,
  handleBack,
  cartItemCount
}) => {
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
      <div className={styles.headbar1}>
        <div className={styles.search1}>
          <input
            type="text"
            name="search"
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
      <div className={styles.backbut} onClick={() => handleBack()}>
        <img src={backArrow} alt="back" style={{ marginTop: "15px" }} />
      </div>
      <div style={{ display: cartProducts.length === 0 ? "none" : "block" }}>
        <div className={styles.cartContainer1}>
          <div className={styles.borderdiv1}>
            {cartProducts.map((productWithQuantity, index) => (
              <div key={index} style={{ width: "90%" }}>
                <div className={styles.cartproduct1}>
                  <div className={styles.box}>
                    <div className={styles.prImage1}>
                      <img
                        src={productWithQuantity.product.images[0].image1}
                        alt="sample img"
                      />
                    </div>
                  </div>
                  <div className={styles.box1}>
                    <div className={styles.pname1}>
                      {productWithQuantity.product.product_name}
                    </div>
                    <div className={styles.amount}>
                      ₹ {productWithQuantity.product.price}
                    </div>
                    <div className={styles.color}>
                      Color: {productWithQuantity.product.color}
                    </div>
                    <div className={styles.color}>
                      {productWithQuantity.product.available}
                    </div>
                    <div className={styles.quantitydiv1}>
                      <div className={styles.price1}>Quantity</div>
                      <div className={styles.amount1}>
                        <select
                          value={productWithQuantity.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (!isNaN(newQuantity)) {
                              const updatedCartProducts = [...cartProducts];
                              updatedCartProducts[index].quantity = newQuantity;
                              setCartProducts(updatedCartProducts);
                            }
                          }}
                        >
                          {[...Array(8).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                              {num + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className={styles.totaldiv1}>
                      <div className={styles.price}>Total : </div>
                      <div className={styles.price}>
                        ₹{" "}
                        {productWithQuantity.product.price *
                          productWithQuantity.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div
            style={{
              height: "90%",
              display: "flex",
              flexDirection: "column",
              width: "90%",
            }}
          >
            <div className={styles.prDetails1}>
              <div className={styles.tag1}>Total MRP</div>
              <div className={styles.value1}>₹ {totalMrp}</div>
            </div>
            <div className={styles.prDetails1}>
              <div className={styles.tag}>Convenience Fee</div>
              <div className={styles.value1}>₹ 45</div>
            </div>
            <div className={styles.prDetails1}>
              <div className={styles.tag1}>Total Amount</div>
              <div className={styles.value1}>₹ {totalMrp + 45}</div>
            </div>

            <div className={styles.placeOrder1}>
              <button onClick={handlePlaceOrder}>PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
      {cartProducts.length === 0 && (
        <div>
          <NoItem />
        </div>
      )}
      <MobileFooter
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        state={"cart"}
        cartItemCount={cartItemCount}
      />
    </>
  );
};

export default MobileCart;
