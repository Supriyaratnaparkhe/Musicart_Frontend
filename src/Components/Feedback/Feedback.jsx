import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Feedback.module.css";
import feedback from "../../assets/feedback.png";

const Feedback = ({ isLoggedIn, userId }) => {
  const [showform, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    feedbackType: "",
    feedbackText: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState("Submit");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateValues = (formData) => {
    const errors = {};

    if (!formData.feedbackType) {
      errors.feedbackType = "*Required field";
    }

    if (!formData.feedbackText) {
      errors.feedbackText = "*Required field";
    }

    setErrors(errors);
    if (Object.keys(errors).length !== 0) {
      setLoading("Submit");
    }
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Loading...");
    const isValid = validateValues(formData);
    if (isValid) {
      try {
        await axios.put(
          `https://musicart-backend-zxey.onrender.com/auth/${userId}`,
          {
            feedbackType: formData.feedbackType,
            feedbackText: formData.feedbackText,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setFormData({ feedbackType: "", feedbackText: "" });
        setShowForm(false);
        setLoading("Submit");
        toast.success("Feedback form submit!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        setLoading("Submit");
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
    }
  };
  const handleClose = (e) => {
    e.preventDefault();
    setShowForm(false);
    setLoading("Submit");
    setErrors({});
  };
  return isLoggedIn ? (
    <>
      <div className={styles.feedback}>
        <img src={feedback} alt="feedback" onClick={() => setShowForm(true)} />
      </div>
      {showform ? (
        <div className={styles.feedbackform}>
          <div>
            <form onSubmit={handleSubmit}>
              <div className={styles.title}>Type of feedback</div>
              <div className={styles.selectbox}>
                <select
                  name="feedbackType"
                  id="feedbackType"
                  value={formData.feedbackType}
                  onChange={handleChange}
                  className={
                    errors.feedbackType ? styles.errorbox : styles.noerrorbox
                  }
                >
                  <option value="">Choose the type</option>
                  <option value="bugs">Bugs</option>
                  <option value="feedback">Feedback</option>
                  <option value="query">Query</option>
                </select>
              </div>
              <div className={styles.error}>
                {errors.feedbackType ? errors.feedbackType : ""}
              </div>
              <div className={styles.title}>Feedback</div>
              <div className={styles.inputbox}>
                <textarea
                  name="feedbackText"
                  id="feedbackText"
                  value={formData.feedbackText}
                  onChange={handleChange}
                  className={
                    errors.feedbackText ? styles.errorbox : styles.noerrorbox
                  }
                  placeholder="Type your feedback"
                />
              </div>
              <div className={styles.error}>
                {errors.feedbackText ? errors.feedbackText : ""}
              </div>
              <div className={styles.submit}>
                  <button type="submit">{loading}</button>
              </div>
            </form>
            <div className={styles.close} onClick={handleClose}>
              X
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  ) : (
    ""
  );
};

export default Feedback;
