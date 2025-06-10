import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import collektoText from "/collektotext.png";
import LogoColleckto from "/logo-collekto.png";
import LoginLeft from "/loginleftdesign.jpeg";
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const decodeJWT = (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload); // base64 decode
      return JSON.parse(decoded);
    } catch (e) {
      console.error("Failed to decode JWT", e);
      return null;
    }
  };

  const handleLogin = async (e) => {
  try {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    // console.log('Login successful:', data);
    const token = data.token;
    // console.log(token);

    // Decode the JWT payload to get the role
    const base64Payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(base64Payload));
    // console.log(decodedPayload);
    const role = decodedPayload.role;
    // console.log(role);


    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    if (role == "ROLE_ADMIN") {
      navigate("/admin");
    } else if (role == "ROLE_USER") {
      navigate("/user");
    } else if (role == "ROLE_LEGAL") {
      navigate("/legal");
    } else {
      setError("Invalid role in token");
    }
  } catch (err) {
    console.error('Error:', error.message);
    setError("Invalid username or password");
  }
};


  return (
    <div className="loginpage">
      <div className="loginpage-left">
        <img src={LoginLeft} alt="Login Left Design" className="left-image" />
      </div>
      <div className="loginpage-right">
        <div className="logo-container">
          <img src={collektoText} alt="Collekto Logo" className="logo" />
          <img src={LogoColleckto} alt="Collekto Text" className="logo-text" />
        </div>
        <h2><span className="highlight">Login</span></h2>
        <div className="loginpage-formwrapper">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={{ paddingRight: "2.5rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="password-toggle-btn"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye-off SVG
                <svg className="password-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7.5a11.64 11.64 0 0 1 5.17-5.81"/><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c.96 0 1.84-.38 2.47-1"/></svg>
              ) : (
                // Eye SVG
                <svg className="password-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          <button type="button" className="btn" onClick={handleLogin}>
            Sign in
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
