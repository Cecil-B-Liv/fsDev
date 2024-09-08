import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/feature/authSlice";
import { login } from "../apis/auth.js";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "../styles/loginSignupComponent.css";

export default function LoginSignupComponent() {
  const [focusedButton, setFocusedButton] = useState(0);

  const handleFocus = (index) => {
    setFocusedButton(index);
  };

  function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const handleSubmit = async (event) => {
      event.preventDefault();
      setError(null);

      try {
        const response = await login(formData);

        // Dispatch the setUser action with the received user data
        // dispatch(setUser(response.user));

        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        setError(error.message);
      }
    };

    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="mb-3 custom-input"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="mb-3 custom-input"
            />
          </Form.Group>

          {error && <div className="error">{error}</div>}
          <Button className="login-btn" type="submit" variant="primary">
            Log in
          </Button>
        </Form>
      </>
    );
  }

  function SignupPage() {
    return (
      <Form>
        <Form.Group controlId="signup-email">
          <Form.Control
            type="email"
            placeholder="Email address or phone number"
            className="mb-3 custom-input"
          />
        </Form.Group>

        <Form.Group controlId="signup-password">
          <Form.Control
            type="password"
            placeholder="Password"
            className="mb-3 custom-input"
          />
        </Form.Group>

        <Form.Group controlId="signup-displayname">
          <Form.Control
            type="text"
            placeholder="Display name"
            className="mb-3 custom-input"
          />
        </Form.Group>

        <Form.Group controlId="signup-telephone">
          <Form.Control
            type="tel"
            placeholder="Telephone number"
            className="mb-3 custom-input"
          />
        </Form.Group>

        <Button className="login-btn" variant="primary">
          Create Account
        </Button>
      </Form>
    );
  }

  return (
    <>
      <div className="center-container">
        <div className="login-container">
          {focusedButton === 0 ? (
            <h1>Welcome Back</h1>
          ) : (
            <h1>Create an Account</h1>
          )}
          <div className="login-signup-options-btn">
            <Button
              className="option"
              onFocus={() => handleFocus(0)}
              style={{
                backgroundColor: focusedButton === 0 ? "#454BCF" : "#91A2DE",
                color: focusedButton === 0 ? "white" : "black",
              }}
            >
              Login
            </Button>
            <Button
              className="option"
              onFocus={() => handleFocus(1)}
              style={{
                backgroundColor: focusedButton === 1 ? "#454BCF" : "#91A2DE",
                color: focusedButton === 1 ? "white" : "black",
              }}
            >
              Sign up
            </Button>
          </div>
          {focusedButton === 0 ? <LoginPage /> : <SignupPage />}
        </div>
      </div>
    </>
  );
}
