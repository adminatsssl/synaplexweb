import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'; // Make sure to create and add the CSS from below
import collektoText from "/collektotext.png";
import LoginLeft from "/loginleft-desgin.jpeg";
import LogoColleckto from "/logo-collekto.png";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/rest/login/${username}/${password}`
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }
      
      const data = await response.json();
      const role = data.role;
      localStorage.setItem("role", role);

      if (role === "Administrator") {
        navigate("/admin");
      } else if (role === "User") {
        navigate("/user");
      } else if (role === "Legal") {
        navigate("/legal");
      } else {
        setError("Invalid Username or Password");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="loginpage">
      {/* Left Side with Full-Screen Image */}
      <div className="loginpage-left">
        <img
          src={LoginLeft} // Update with your actual asset path
          alt="Login Left Design"
          className="left-image"
        />
      </div>

      {/* Right Side with Form */}
      <div className="loginpage-right">
        <div className="logo-container">
          <img
            src={collektoText} // Update with your actual asset path
            alt="Collekto Logo"
            className="logo"
          />
          <img
            src={LogoColleckto} // Update with your actual asset path
            alt="Collekto Text"
            className="logo-text"
          />
        </div>
        <h2>
          <span className="highlight">Login</span>
        </h2>
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
          <button
            type="button"
            className="btn"
            onClick={handleLogin}
          >
            Sign in
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
