import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/auth.js";
export default function LoginSignupComponent() {
  const [focusedButton, setFocusedButton] = useState(0);

  const handleFocus = (index) => {
    setFocusedButton(index);
  };

  function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
      setError(null);

      try {
        const response = await login(formData);
        console.log("Login successful:", response);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        setError(error.message);
      }
    };
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            required
          ></input>
          <input
            className="password-input"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type="password"
            required
          ></input>
          {error && <div className="error">{error}</div>}
          <button className="login-btn" type="submit">
            Log in
          </button>
          {/* <a href="" className="forget-password">
            Forgotten password?
          </a>        */}
        </form>
      </>
    );
  }

  function SignupPage() {
    return (
      <form>
        <input
          className="login-input"
          placeholder="Email address or phone number"
        ></input>
        <input className="password-input" placeholder="Password"></input>
        <input className="displayname-input" placeholder="Display name"></input>
        <input
          className="telephone-input"
          placeholder="Telephone number"
        ></input>
        <button className="login-btn">Create Account</button>
      </form>
    );
  }

  // Style variables
  const containerStyle = {
    border: "2px solid #454BCF",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <>
      <div className="center-container">
        <div className="login-container" style={containerStyle}>
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
              onFocus={() => handleFocus(0)}
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
              onFocus={() => handleFocus(1)}
            >
              Sign up
            </button>
          </div>
          {focusedButton === 0 ? LoginPage() : SignupPage()}
        </div>
      </div>
    </>
  );
}
