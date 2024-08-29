import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../redux/slices/loginSlice"; // Adjust the import based on your file structure
// import "./LoginSignupPage.css"; // Ensure the correct path to your CSS file

export default function LoginComponent() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth); // Use auth slice state
  const [focusedButton, setFocusedButton] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    telephone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    dispatch(loginUser({ email: formData.email, password: formData.password }));
  };

  const handleSignup = () => {
    dispatch(
      signupUser({
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
        telephone: formData.telephone,
      })
    );
  };

  return (
    <div className="center-container">
      <div className="login-container">
        {focusedButton === 0 ? (
          <h1 style={{ fontFamily: "arial" }}>Welcome Back</h1>
        ) : (
          <h1 style={{ fontFamily: "arial" }}>Create an Account</h1>
        )}
        <div className="login-signup-options-btn">
          <button
            className="option"
            style={{
              backgroundColor: focusedButton === 0 ? "#454BCF" : "#91A2DE",
              color: focusedButton === 0 ? "white" : "black",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            }}
            onClick={() => setFocusedButton(0)}
          >
            Login
          </button>
          <button
            className="option"
            style={{
              backgroundColor: focusedButton === 1 ? "#454BCF" : "#91A2DE",
              color: focusedButton === 1 ? "white" : "black",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
            onClick={() => setFocusedButton(1)}
          >
            Sign up
          </button>
        </div>
        {focusedButton === 0 ? (
          <>
            <input
              name="email"
              className="login-input"
              placeholder="Email address or phone number"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              name="password"
              type="password"
              className="password-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button className="login-btn" onClick={handleLogin}>
              Log in
            </button>
          </>
        ) : (
          <>
            <input
              name="email"
              className="login-input"
              placeholder="Email address or phone number"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              name="password"
              type="password"
              className="password-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              name="displayName"
              className="displayname-input"
              placeholder="Display name"
              value={formData.displayName}
              onChange={handleInputChange}
            />
            <input
              name="telephone"
              className="telephone-input"
              placeholder="Telephone number"
              value={formData.telephone}
              onChange={handleInputChange}
            />
            <button className="login-btn" onClick={handleSignup}>
              Create Account
            </button>
          </>
        )}
        {status === "loading" && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
