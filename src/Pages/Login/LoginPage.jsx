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
    console.log('Login successful:', data);
    const token = data.token;
    console.log(token);

    // Decode the JWT payload to get the role
    const base64Payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(base64Payload));
    console.log(decodedPayload);
    const role = decodedPayload.role;
    console.log(role);


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
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
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
