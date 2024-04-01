import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Register.module.css";
import Footer from "../../Components/Footer/Footer";
import logo from "../../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [UserState, setUserState] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState("Continue");
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
  const validateValues = (UserState) => {
    const errors = {};
    if (!UserState.name) {
      errors.name = "*Name field is required";
    }
    if (!UserState.mobile) {
      errors.mobile = "*mobile field is required";
    }
    if (!UserState.email) {
      errors.email = "*Email field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(UserState.email)) {
      errors.email = "Invalid email format";
    }

    if (!UserState.password) {
      errors.password = "*Password is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length !== 0) {
      setLoading("Continue");
    }
    return Object.keys(errors).length === 0;
  };
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setLoading("Loading...");
      const isValid = validateValues(UserState);

      if (isValid) {
        const response = await axios.post(
          "http://localhost:3001/auth/register",
          {
            name: UserState.name,
            mobile: UserState.mobile,
            email: UserState.email,
            password: UserState.password,
          }
        );
        const userId = response.data.userId;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("UserName", response.data.UserName);
        sessionStorage.setItem("isValidSession", true);

        toast.success("Register successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate(`/${userId}`);
        }, 700);
        return response.data;
      }
    } catch (error) {
      console.error(error);
      setLoading("Continue");
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
  };
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const updateForm = (e) => {
    setUserState({
      ...UserState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className={styles.container}>
        <div className={`${isMobile ? styles.body1 : styles.body}`}>
          {isMobile ? (
            <div className={styles.mobileNavbar}>
              <div>
                <img src={logo} alt="logo" />
              </div>
              <div className={styles.headline1}>Musicart</div>
            </div>
          ) : (
            <div className={styles.main}>
              <div>
                <img src={logo} alt="logo" />
              </div>
              <div className={styles.headline}>Musicart</div>
            </div>
          )}
          {isMobile ? <div className={styles.welcome}>Welcome</div> : ""}
          <div className={styles.box}>
            {isMobile ? (
              <div className={styles.mobilecreate}>
                Create Account. <span>Don't have an account?</span>
              </div>
            ) : (
              <div className={styles.create}>Create Account</div>
            )}
            <div className={styles.form}>
              <div style={{ marginBottom: "7px" }}>
                <div className={styles.input}>Your Name</div>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={UserState.name}
                    onChange={updateForm}
                    id={styles.name}
                    className={
                      errors.name ? styles.inputErrorbox : styles.inputbox
                    }
                    placeholder={errors.name ? errors.name : ""}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "7px" }}>
                <div className={styles.input}>Email Id</div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={UserState.email}
                    onChange={updateForm}
                    id={styles.email}
                    className={
                      errors.email ? styles.inputErrorbox : styles.inputbox
                    }
                    placeholder={errors.email ? errors.email : ""}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "7px" }}>
                <div className={styles.input}>Mobile Number</div>
                <div>
                  <input
                    type="text"
                    name="mobile"
                    value={UserState.mobile}
                    onChange={updateForm}
                    id={styles.mobile}
                    className={
                      errors.mobile ? styles.inputErrorbox : styles.inputbox
                    }
                    placeholder={errors.mobile ? errors.mobile : ""}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "7px" }}>
                <div className={styles.input}>Password</div>
                <div>
                  <input
                    type="text"
                    name="password"
                    value={UserState.password}
                    onChange={updateForm}
                    id={styles.pass}
                    className={
                      errors.password ? styles.inputErrorbox : styles.inputbox
                    }
                    placeholder={errors.password ? errors.password : ""}
                  />
                </div>
              </div>
            </div>
            <div className={styles.note}>
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Musicart.
              Message and data rates may apply.
            </div>

            <div className={styles.signupbtn}>
              <button onClick={handleRegister}>
                <div>{loading}</div>
              </button>
            </div>
            <div className={styles.para}>
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </div>
          </div>
        </div>
        <div className={styles.line}>
          Already have an account?{" "}
          <span onClick={handleLogin}>
            <u>Sign in</u>
          </span>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
