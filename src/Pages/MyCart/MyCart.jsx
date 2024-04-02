import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import ViewCart from "../../Components/ViewCart/ViewCart";
import styles from "./MyCart.module.css";
import logo from "../../assets/logo.png";
import bag from "../../assets/bag.png";
import Footer from "../../Components/Footer/Footer";
import Spinner from "../../Components/Spinner/Spinner";
import NoItem from "../../Components/NoItem/NoItem";
import MobileCart from "../../Components/MobileCart/MobileCart";

const MyCart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [totalMrp, setTotalMrp] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); 

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

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get(
          `https://musicart-backend-zxey.onrender.com/product/myCart/${userId}`,

          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setCartProducts(response.data);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [userId]);

  useEffect(() => {
    const calculateTotalMrp = () => {
      let total = 0;
      cartProducts.forEach((productWithQuantity) => {
        total +=
          productWithQuantity.quantity * productWithQuantity.product.price;
      });
      setTotalMrp(total);
    };

    calculateTotalMrp();
    const itemCount = cartProducts.reduce((acc, product) => acc + product.quantity, 0);
    setCartItemCount(itemCount);
  }, [cartProducts]);

  const handleBack = () => {
    if (isLoggedIn) {
      navigate(`/${userId}`);
    } else {
      navigate("/");
    }
  };

  const handlePlaceOrder = () => {
    navigate(`/checkout/${userId}`, { state: { cartProducts, totalMrp } });
  };

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
                  <div className={styles.home}>Home / View Cart</div>
                </div>
                <div className={styles.right}>
                  <ViewCart isLoggedIn={true} cartItemCount={cartItemCount} />
                </div>
              </div>
              <div className={styles.back}>
                <button onClick={() => handleBack()}>Back to products</button>
              </div>
              <div className={styles.cart}>
                <div className={styles.bag}>
                  <img src={bag} alt="bag" />
                </div>
                <div className={styles.headline}>My Cart</div>
              </div>
              <div
                className={styles.bodyC}
                style={{ display: cartProducts.length === 0 ? "none" : "flex" }}
              >
                <div className={styles.leftContainer}>
                  <div className={styles.cartContainer}>
                    <div className={styles.borderdiv}>
                      {cartProducts.map((productWithQuantity, index) => (
                        <div key={index} className={styles.cartproduct}>
                          <div className={styles.prImage}>
                            <img
                              src={productWithQuantity.product.images[0].image1}
                              alt="sample img"
                            />
                          </div>
                          <div className={styles.namediv}>
                            <div className={styles.pname}>
                              {productWithQuantity.product.product_name}
                            </div>
                            <div className={styles.color}>
                              Color: {productWithQuantity.product.color}
                            </div>
                            <div className={styles.color}>
                              {productWithQuantity.product.available}
                            </div>
                          </div>
                          <div className={styles.pricediv}>
                            <div className={styles.price}>Price</div>
                            <div className={styles.amount}>
                              ₹ {productWithQuantity.product.price}
                            </div>
                          </div>
                          <div className={styles.quantitydiv}>
                            <div className={styles.price}>Quantity</div>
                            <div className={styles.amount}>
                              <select
                                value={productWithQuantity.quantity}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value);
                                  if (!isNaN(newQuantity)) {
                                    const updatedCartProducts = [
                                      ...cartProducts,
                                    ];
                                    updatedCartProducts[index].quantity =
                                      newQuantity;
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
                          <div className={styles.totaldiv}>
                            <div className={styles.price}>Total</div>
                            <div className={styles.amount}>
                              ₹{" "}
                              {productWithQuantity.product.price *
                                productWithQuantity.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.footer}>
                    <div>{cartProducts.length} item</div>
                    <div>Total price: ₹ {totalMrp}</div>
                  </div>
                </div>
                <div className={styles.rightContainer}>
                  <div
                    style={{
                      height: "90%",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <div className={styles.prDetails}>PRICE DETAILS</div>
                    <div className={styles.priceContainer}>
                      <div className={styles.prRow}>
                        <div className={styles.tag}>Total MRP</div>
                        <div className={styles.value1}>₹ {totalMrp}</div>
                      </div>
                      <div className={styles.prRow}>
                        <div className={styles.tag}>Discount on MRP</div>
                        <div className={styles.value1}>₹ 0</div>
                      </div>
                      <div className={styles.prRow}>
                        <div className={styles.tag}>Convenience Fee</div>
                        <div className={styles.value1}>₹ 45</div>
                      </div>
                    </div>
                    <div className={styles.totalAmount}>
                      <div className={styles.tag1}>Total Amount</div>
                      <div className={styles.value}>₹ {totalMrp + 45}</div>
                    </div>
                    <div className={styles.placeOrder}>
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
            </div>
          ) : (
            loading && <Spinner />
          )}

          <Footer />
        </div>
      ) : (
        <div className={styles.container1}>
          {!loading ? (
            <MobileCart
              cartProducts={cartProducts}
              handleBack={handleBack}
              setCartProducts={setCartProducts}
              totalMrp={totalMrp}
              handlePlaceOrder={handlePlaceOrder}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              cartItemCount={cartItemCount}
            />
          ) : (
            loading && <Spinner />
          )}
        </div>
      )}
    </>
  );
};

export default MyCart;
