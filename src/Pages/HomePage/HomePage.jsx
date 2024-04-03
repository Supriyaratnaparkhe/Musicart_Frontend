import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./HomePage.module.css";
import logo from "../../assets/logo.png";
import person from "../../assets/person.png";
import search from "../../assets/search.png";
import gridview from "../../assets/gridview.png";
import gridhide from "../../assets/gridhide.png";
import listview from "../../assets/listview.png";
import listhide from "../../assets/listhide.png";

import { isUserLoggedIn } from "../../utils/util";
import Gridview from "../../Components/Gridview/Gridview";
import Listview from "../../Components/Listview/Listview";
import Footer from "../../Components/Footer/Footer";
import ViewCart from "../../Components/ViewCart/ViewCart";
import Profile from "../../Components/Profile/Profile";
import Feedback from "../../Components/Feedback/Feedback";
import Spinner from "../../Components/Spinner/Spinner";
import MobileHome from "../../Components/MobileHome/MobileHome";
import MobileFooter from "../../Components/MobileFooter/MobileFooter";

const HomePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn(userId));
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { searchq } = location.state || {};
  
  const [filters, setFilters] = useState({
    type: "",
    company: "",
    color: "",
    priceRange: "",
    sortBy: "",
    search: "",
  });

  const [gridType, setGridType] = useState(true);
  const [listType, setListType] = useState(false);
  const [grid, setgrid] = useState(gridview);
  const [list, setlist] = useState(listhide);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchq);

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
    if (location.state && searchQuery) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: searchQuery,
      }));
    }
  }, [location.state,searchQuery]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
    
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://musicart-backend-zxey.onrender.com/product/getAllProducts",
          { params: filters }
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      } 
    };
  
    if (!searchQuery) {
      fetchData();
    }  
  }, [filters, searchQuery]);

  useEffect(() => {
    const fetchsearchData = async () => {
      try {
        const response = await axios.get(
          "https://musicart-backend-zxey.onrender.com/product/getAllProducts",
          { params: { search: searchQuery } }
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
  
    if (searchQuery) {
        fetchsearchData();
        setSearchQuery(""); 
    }  
  }, [searchQuery]);
  
  const handleGridView = () => {
    setGridType(true);
    setListType(false);
    setgrid(gridview);
    setlist(listhide);
  };
  const handleListView = () => {
    setListType(true);
    setGridType(false);
    setgrid(gridhide);
    setlist(listview);
  };

  const handleInvoices = () => {
    navigate(`/invoices/${userId}`);
  };
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

  return (
    <>
      {!isMobile ? (
        <div>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          {!loading ? (
            <div className={styles.container}>
              <div className={`${styles.header} ${styles.fixedHeader}`}>
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
                  <div className={styles.home}>Home</div>
                  {isLoggedIn ? (
                    <div className={styles.home} onClick={handleInvoices}>
                      Invoice
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.right}>
                  <ViewCart
                    cartItemCount={cartItemCount}
                    isLoggedIn={isLoggedIn}
                  />
                  <Profile
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </div>
              </div>
              <div className={styles.advertise}>
                <div className={styles.text}>
                  Grab upto 50% off on Selected headphones
                </div>
                <div className={styles.person}>
                  <img src={person} alt="person" />
                </div>
              </div>
              <div className={styles.search}>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  className={styles.searchbar}
                  placeholder="Search by Product Name"
                />
                <img
                  src={search}
                  alt="search"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div className={styles.operation}>
                <div className={styles.viewtype}>
                  <div className={styles.view} onClick={handleGridView}>
                    <img src={grid} alt="gridview" />
                  </div>
                  <div className={styles.view} onClick={handleListView}>
                    <img src={list} alt="listview" />
                  </div>
                </div>
                <div className={styles.filter}>
                  <div className={styles.option}>
                    <select
                      name="type"
                      value={filters.type}
                      className={styles.selectedoption}
                      onChange={handleFilterChange}
                    >
                      <option value="">Headphone type</option>
                      <option value="">All</option>
                      <option value="In-ear">In-ear</option>
                      <option value="On-ear">On-ear</option>
                      <option value="Over-ear">Over-ear</option>
                    </select>
                  </div>
                  <div className={styles.option}>
                    <select
                      name="company"
                      value={filters.company}
                      className={styles.selectedoption}
                      onChange={handleFilterChange}
                    >
                      <option value="">Company</option>
                      <option value="">All</option>
                      <option value="Sony">Sony</option>
                      <option value="boAt">boAt</option>
                      <option value="JBL">JBL</option>
                      <option value="ZEBRONICS">Zebronics</option>
                      <option value="Marshall">Marshall</option>
                      <option value="pTron">Ptron</option>
                    </select>
                  </div>
                  <div className={styles.option}>
                    <select
                      name="color"
                      value={filters.color}
                      className={styles.selectedoption}
                      onChange={handleFilterChange}
                    >
                      <option value="">Colour</option>
                      <option value="">All</option>
                      <option value="Black">Black</option>
                      <option value="Blue">Blue</option>
                      <option value="White">White</option>
                      <option value="Brown">Brown</option>
                    </select>
                  </div>
                  <div className={styles.option}>
                    <select
                      name="priceRange"
                      value={filters.priceRange}
                      className={styles.selectedoption}
                      onChange={handleFilterChange}
                    >
                      <option value="">Price</option>
                      <option value="">All</option>
                      <option value="0-1000">₹0 - ₹1,000</option>
                      <option value="1001-10000">₹1,001 - ₹10,000</option>
                      <option value="10001-20000">₹10,001 - ₹20,000</option>
                    </select>
                  </div>
                </div>
                <div className={styles.sort}>
                  <select
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                  >
                    <option value="">Sort by : Featured</option>
                    <option value="price:lowest">
                      Price: Lowest to Highest
                    </option>
                    <option value="price:highest">
                      Price: Highest to Lowest
                    </option>
                    <option value="name:AtoZ">Name: A to Z</option>
                    <option value="name:ZtoA">Name: Z to A</option>
                  </select>
                </div>
              </div>

              {gridType ? (
                <Gridview
                  products={products}
                  setCartItemCount={setCartItemCount}
                  isLoggedIn={isLoggedIn}
                />
              ) : (
                ""
              )}
              {listType ? (
                <Listview
                  products={products}
                  setCartItemCount={setCartItemCount}
                  isLoggedIn={isLoggedIn}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            loading && <Spinner />
          )}
          <Feedback isLoggedIn={isLoggedIn} userId={userId} />
          <Footer />

          <ToastContainer />
        </div>
      ) : (
        <div className={styles.container1}>
          {!loading ? (
            <>
              <div className={styles.headbar1}>
                <div className={styles.search1}>
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100vw",
                }}
              >
                <div className={styles.advertise1}>
                  <div className={styles.text1}>
                    Grab upto 50% off on Selected headphones
                  </div>
                  <div className={styles.person1}>
                    <img src={person} alt="person" />
                  </div>
                  <div><button className={styles.buynow}>Buy Now</button></div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100vw",
                }}
              >
                <div className={styles.operation1}>
                  <div className={styles.sort1}>
                    <select
                      name="sortBy"
                      value={filters.sortBy}
                      onChange={handleFilterChange}
                    >
                      <option value="">Sort by</option>
                      <option value="price:lowest">
                        Price: Lowest to Highest
                      </option>
                      <option value="price:highest">
                        Price: Highest to Lowest
                      </option>
                      <option value="name:AtoZ">Name: A to Z</option>
                      <option value="name:ZtoA">Name: Z to A</option>
                    </select>
                  </div>
                  <div className={styles.filter1}>
                    <div className={styles.option1}>
                      <select
                        name="type"
                        value={filters.type}
                        className={styles.selectedoption1}
                        onChange={handleFilterChange}
                      >
                        <option value="">Headphone type</option>
                        <option value="">All</option>
                        <option value="In-ear">In-ear</option>
                        <option value="On-ear">On-ear</option>
                        <option value="Over-ear">Over-ear</option>
                      </select>
                    </div>
                    <div className={styles.option1}>
                      <select
                        name="company"
                        value={filters.company}
                        className={styles.selectedoption1}
                        onChange={handleFilterChange}
                      >
                        <option value="">Company</option>
                        <option value="">All</option>
                        <option value="Sony">Sony</option>
                        <option value="boAt">boAt</option>
                        <option value="JBL">JBL</option>
                        <option value="ZEBRONICS">Zebronics</option>
                        <option value="Marshall">Marshall</option>
                        <option value="pTron">Ptron</option>
                      </select>
                    </div>
                    <div className={styles.option1}>
                      <select
                        name="color"
                        value={filters.color}
                        className={styles.selectedoption1}
                        onChange={handleFilterChange}
                      >
                        <option value="">Colour</option>
                        <option value="">All</option>
                        <option value="Black">Black</option>
                        <option value="Blue">Blue</option>
                        <option value="White">White</option>
                        <option value="Brown">Brown</option>
                      </select>
                    </div>
                    <div className={styles.option1}>
                      <select
                        name="priceRange"
                        value={filters.priceRange}
                        className={styles.selectedoption1}
                        onChange={handleFilterChange}
                      >
                        <option value="">Price</option>
                        <option value="">All</option>
                        <option value="0-1000">₹0 - ₹1,000</option>
                        <option value="1001-10000">₹1,001 - ₹10,000</option>
                        <option value="10001-20000">₹10,001 - ₹20,000</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <MobileHome
                products={products}
                setCartItemCount={setCartItemCount}
                isLoggedIn={isLoggedIn}
              />
              <MobileFooter
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                state={"home"}
                cartItemCount={cartItemCount}
              />
              <ToastContainer />
            </>
          ) : (
            loading && <Spinner />
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
