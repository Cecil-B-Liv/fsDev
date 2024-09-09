import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../apis/auth.js"; // Import both register and login
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/loginSignupComponent.css";

export default function LoginSignupComponent() {
  const [focusedButton, setFocusedButton] = useState(0);
  const navigate = useNavigate();

  const handleFocus = (index) => {
    setFocusedButton(index);
  };

  function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();
      setError(null);

      try {
        const response = await login(formData);
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
    const [formData, setFormData] = useState({
      username: "",
      displayName: "",
      email: "",
      telephone: "",
      password: "",
      userBio: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();
      setError(null);

      try {
        const resgisterData = new FormData();

        if (selectedFile) {
          resgisterData.append("picturePath", selectedFile);
        }
        for (const key in formData) {
          resgisterData.append(key, formData[key]);
        }

        await register(resgisterData); // Sending FormData to handle file upload
        
        console.log("Signup successful");
        navigate("/"); // Redirect after successful signup
      } catch (error) {
        console.error("Signup error:", error);
        setError(error.message || "An error occurred during registration.");
      }
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="signup-username">
          <Form.Control
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
            className="mb-3 custom-input"
          />
        </Form.Group>

        <Form.Group controlId="signup-displayname">
          <Form.Control
            type="text"
            placeholder="Display name"
            value={formData.displayName}
            onChange={(e) =>
              setFormData({ ...formData, displayName: e.target.value })
            }
            required
            className="mb-3 custom-input"
          />
        </Form.Group>

        <Form.Group controlId="signup-email">
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

        <Form.Group controlId="signup-telephone">
          <Form.Control
            type="tel"
            placeholder="Telephone number"
            value={formData.telephone}
            onChange={(e) =>
              setFormData({ ...formData, telephone: e.target.value })
            }
            required
            className="mb-3 custom-input"
          />
        </Form.Group>

        <Form.Group controlId="signup-password">
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

        <Form.Group controlId="signup-bio">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Tell us about yourself"
            value={formData.userBio}
            onChange={(e) =>
              setFormData({ ...formData, userBio: e.target.value })
            }
            required
            className="mb-3 custom-input"
          />
        </Form.Group>

        <Row>
          <Col className="d-flex justify-content-start">
            <Form.Control
              type="file"
              name="picturePath"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
          </Col>
        </Row>

        {error && <div className="error">{error}</div>}

        <Button className="login-btn" type="submit" variant="primary">
          Create Account
        </Button>
      </Form>
    );
  }

  return (
    <>
      <div className="center-container">
        <div
          className={`login-container ${
            focusedButton === 0 ? "login-height" : "signup-height"
          }`}
        >
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
