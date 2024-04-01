import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Invoices.module.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import ViewCart from "../../Components/ViewCart/ViewCart";
import logo from "../../assets/logo.png";
import Line2 from "../../assets/Line2.png";
import invoiceImg from "../../assets/invoice.png";
import backArrow from "../../assets/backArrow.png";
import Spinner from "../../Components/Spinner/Spinner";
import NoInvoice from "../../Components/NoItem/NoInvoice";
import MobileFooter from "../../Components/MobileFooter/MobileFooter";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
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
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/getinvoices/${userId}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [userId]);

  const handleBack = () => {
    if (isLoggedIn) {
      navigate(`/${userId}`);
    } else {
      navigate("/");
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
                  <div className={styles.home}>Home / Invoices</div>
                </div>
                <div className={styles.right}>
                  <ViewCart isLoggedIn={true} />
                </div>
              </div>
              <div className={styles.back}>
                <button onClick={() => handleBack()}>Back to Home</button>
              </div>
              <div className={styles.headline}>
                <div>My Invoices</div>
              </div>
              <div
                className={styles.bodyC}
                style={{ display: invoices.length === 0 ? "none" : "flex" }}
              >
                <div>
                  {invoices.map((invoice) => (
                    <div key={invoice._id}>
                      <div className={styles.box}>
                        <div className={styles.leftSide}>
                          <div className={styles.invoiceImg}>
                            <img src={invoiceImg} alt="invoice" />
                          </div>
                          <div
                            className={styles.details}
                            style={{ width: "30vw" }}
                          >
                            <div>{invoice.orderPerson}</div>
                            <div>{invoice.address}</div>
                          </div>
                        </div>
                        <Link to={`/invoices/${userId}/${invoice._id}`}>
                          <div className={styles.invoicebut}>
                            <button>View Invoice</button>
                          </div>
                        </Link>
                      </div>
                      <div style={{ marginTop: "2vh" }}>
                        <img src={Line2} alt="line" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {invoices.length === 0 && (
                <div>
                  <NoInvoice />
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
            <>
              <div className={styles.mobileNavbar}>
                <div>
                  <img src={logo} alt="logo" />
                </div>
                <div className={styles.headline1}>Musicart</div>
              </div>
              <div className={styles.backbut} onClick={() => handleBack()}>
                <img src={backArrow} alt="back" style={{ marginTop: "15px" }} />
              </div>
              <div className={styles.header1}>My invoices</div>
              <div
                className={styles.bodyC1}
                style={{ display: invoices.length === 0 ? "none" : "flex" }}
              >
                <div>
                  {invoices.map((invoice) => (
                    <div key={invoice._id}>
                      <div className={styles.box1}>
                        <div className={styles.leftSide1}>
                          <div className={styles.invoiceImg1}>
                            <img src={invoiceImg} alt="invoice" />
                          </div>
                          <div
                            className={styles.details1}
                            style={{ width: "30vw" }}
                          >
                            <div>{invoice.orderPerson}</div>
                            <div>{invoice.address}</div>
                          </div>
                        </div>
                        <Link to={`/invoices/${userId}/${invoice._id}`}>
                          <div className={styles.invoicebut1}>
                            <button>View Invoice</button>
                          </div>
                        </Link>
                      </div>
                      <div className={styles.lineImg1}>
                        <img src={Line2} alt="line" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {invoices.length === 0 && (
                <div>
                  <NoInvoice />
                </div>
              )}
              <MobileFooter
                isLoggedIn={true}
                setIsLoggedIn={setIsLoggedIn}
                state={"invoice"}
              />
            </>
          ) : (
            loading && <Spinner />
          )}
        </div>
      )}
    </>
  );
};

export default Invoices;
