import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Login.module.css";
import Footer from "../../Components/Footer/Footer";
import logo from "../../assets/logo.png";
import line from "../../assets/line.png";

const Login = () => {
  const navigate = useNavigate();
  const [UserState, setUserState] = useState({
    identifier: "",
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

    if (!UserState.identifier) {
      errors.identifier = "*Email or mobile field is required";
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
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading("Loading...");
      const isValid = validateValues(UserState);

      if (isValid) {
        const response = await axios.post("http://localhost:3001/auth/login", {
          identifier: UserState.identifier,
          password: UserState.password,
        });
        const userId = response.data.userId;
        localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("isValidSession", true);
        localStorage.setItem("UserName", response.data.UserName);

        toast.success("Login successful!", {
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
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
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
            <div className={styles.create}>Sign in</div>
            <div className={styles.form}>
              <form onSubmit={handleLogin} className={styles.centeredForm}>
                <div style={{ marginBottom: "7px" }}>
                  <div className={styles.input}>
                    Enter your email or mobile number
                  </div>
                  <div>
                    <input
                      type="text"
                      name="identifier"
                      value={UserState.identifier}
                      onChange={updateForm}
                      className={
                        errors.identifier
                          ? styles.inputErrorbox
                          : styles.inputbox
                      }
                      placeholder={errors.identifier ? errors.identifier : ""}
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
                      className={
                        errors.password ? styles.inputErrorbox : styles.inputbox
                      }
                      placeholder={errors.password ? errors.password : ""}
                    />
                  </div>
                </div>

                <div className={styles.loginbtn}>
                  <button type="submit">
                    <div>{loading}</div>
                  </button>
                </div>
                <div className={styles.para}>
                  By continuing, you agree to Musicart privacy notice and
                  conditions of use.
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.line}>
          <div style={{ marginTop: "-5px", width: "25%" }}>
            <img
              src={line}
              alt="line"
              style={{ width: "100%", height: "2px" }}
            />
          </div>
          <div>New to Musicart ? </div>
          <div style={{ marginTop: "-5px", width: "25%" }}>
            <img
              src={line}
              alt="line"
              style={{ width: "100%", height: "2px" }}
            />
          </div>
        </div>
        <div className={styles.registerbut}>
          <button onClick={handleRegister}>
            {" "}
            Create your Musicart account
          </button>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
