import { useState } from "react";
// import { Link } from "react-router-dom";
export default function LoginComponent() {
  const [focusedButton, setFocusedButton] = useState(0);

  const handleFocus = (index) => {
    setFocusedButton(index);
  };

  function LoginPage() {
    return (
      <>
        <input
          className="login-input"
          placeholder="Email address or phone number"
        ></input>
        <input className="password-input" placeholder="Password"></input>
        <button className="login-btn">Log in</button>
        <a href="" className="forget-password">
          Forgotten password?
        </a>
      </>
    );
  }

  function SignupPage() {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
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
              onFocus={() => handleFocus(0)}
            >
              Log in
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
