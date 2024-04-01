import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { isUserLoggedIn } from "../../utils/util";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./ProductDetails.module.css";
import logo from "../../assets/logo.png";
import ViewCart from "../../Components/ViewCart/ViewCart";
import Footer from "../../Components/Footer/Footer";
import Spinner from "../../Components/Spinner/Spinner";
import MobileProduct from "../../Components/MobileProduct/MobileProduct";

const ProductDetails = () => {
  const { userId } = useParams();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({
    product_name: "",
    about: "",
    type: "",
    company: "",
    color: "",
    price: 0,
    star: 0,
    review: 0,
    available: "",
    description: [],
    images: [],
  });
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn(userId));
  const [image1st, setImage1] = useState("");
  const [image2nd, setImage2] = useState("");
  const [image3rd, setImage3] = useState("");
  const [image4th, setImage4] = useState("");
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

  useEffect(() => {
    try {
      setIsLoggedIn(isUserLoggedIn(userId));
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://musicart-backend-zxey.onrender.com/product/getProductDetails/${productId}`
        );
        const {
          product_name,
          about,
          type,
          company,
          color,
          price,
          star,
          review,
          available,
          description,
          images,
        } = response.data;
        setDetails({
          product_name,
          about,
          type,
          company,
          color,
          price,
          star,
          review,
          available,
          description,
          images,
        });
        if (images.length > 0) {
          setImage1(images[0].image1);
          setImage2(images[1].image2);
          setImage3(images[2].image3);
          setImage4(images[3].image4);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);
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
          setCartItemCount(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };
    fetchCartItem();
  }, [userId, isLoggedIn]);
  const renderStars = () => {
    switch (details.star) {
      case 1:
        return "⭐☆☆☆☆";
      case 2:
        return "⭐⭐☆☆☆";
      case 3:
        return "⭐⭐⭐☆☆";
      case 4:
        return "⭐⭐⭐⭐☆";
      case 5:
        return "⭐⭐⭐⭐⭐";
      default:
        break;
    }
  };
  const handleAddToCart = async (productId) => {
    if (isLoggedIn) {
      try {
        await axios.put(
          `https://musicart-backend-zxey.onrender.com/auth/${userId}/${productId}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success("Item added to cart!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setCartItemCount((prevCount) => prevCount + 1);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          toast.error(data.error, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    } else {
      navigate("/login");
    }
  };
  const handleBack = () => {
    if (isLoggedIn) {
      navigate(`/${userId}`);
    } else {
      navigate("/");
    }
  };
  const handleImage = (inputimage, num) => {
    switch (num) {
      case 2:
        setImage1(inputimage);
        setImage2(image1st);
        break;
      case 3:
        setImage1(inputimage);
        setImage3(image1st);
        break;
      case 4:
        setImage1(inputimage);
        setImage4(image1st);
        break;
      default:
        break;
    }
  };
  const handleBuy = () => {
    if (isLoggedIn) {
      navigate(`/mycart/${userId}`);
    } else {
      navigate("/login");
    }
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
                  <div className={styles.home}>
                    Home / {details.product_name}
                  </div>
                </div>
                <div className={styles.right}>
                  <ViewCart
                    cartItemCount={cartItemCount}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
              </div>
              <div className={styles.back}>
                <button onClick={() => handleBack()}>Back to products</button>
              </div>
              <div className={styles.about}>{details.about}</div>
              <div className={styles.productContainer}>
                <div className={styles.imageContainer}>
                  <div className={styles.upper}>
                    <div className={styles.image1}>
                      <img src={image1st} alt="image1" />
                    </div>
                  </div>
                  <div className={styles.lower}>
                    <div className={styles.image2}>
                      <img
                        src={image2nd}
                        alt="image2"
                        onClick={() => handleImage(image2nd, 2)}
                      />
                    </div>
                    <div className={styles.image2}>
                      <img
                        src={image3rd}
                        alt="image3"
                        onClick={() => handleImage(image3rd, 3)}
                      />
                    </div>
                    <div className={styles.image2}>
                      <img
                        src={image4th}
                        alt="image4"
                        onClick={() => handleImage(image4th, 4)}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.detailContainer}>
                  <div>
                    <div className={styles.pname}>{details.product_name}</div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <div style={{ fontSize: "20px" }}>{renderStars()}</div>
                      <div className={styles.review}>
                        ( {details.review} customer reviews)
                      </div>
                    </div>
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
                  <div>
                    <div className={styles.but}>
                      <button
                        style={{ backgroundColor: "#FFD600" }}
                        onClick={() => handleAddToCart(productId)}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <div className={styles.but}>
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
          ) : (
            loading && <Spinner />
          )}
          <Footer />
          <ToastContainer />
        </div>
      ) : (
        <div>
          {!loading ? (
            <MobileProduct
              details={details}
              handleBack={handleBack}
              handleAddToCart={handleAddToCart}
              handleBuy={handleBuy}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              renderStars={renderStars}
              cartItemCount={cartItemCount}
              productId={productId}
              image1st={image1st}
              image2nd={image2nd}
              image3rd={image3rd}
              image4th={image4th}
            />
          ) : (
            loading && <Spinner />
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
