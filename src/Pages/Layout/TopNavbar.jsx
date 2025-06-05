import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './TopNavbar.css';

export default function TopNavbar() {
  const [tenant, setTenant] = useState(null);
  const navigate = useNavigate();

  const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});


  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/"); // redirect to homepage/login page
  };

  useEffect(() => {
    axios
      .get(`/api/api/tenants`, {
        headers : getAuthHeaders()
      })
      .then((res) => {
        // console.log("Tenant API Response:", res.data);
        const data = res.data?.data?.[0];
        if (data) {
          setTenant({
            name: data.name,
            logoUrl: data.profilePic // Direct image URL
          });
        }
      })
      .catch((err) => console.error("Error fetching tenant:", err));
  }, []);

  return (
    <div className="top-navbar" style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
      {tenant && (
        <div className="tenant-info" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {tenant.logoUrl && (
            <img
              src={tenant.logoUrl}
              alt="Tenant Logo"
              style={{ height: "45px", objectFit: "contain" }}
            />
          )}
          <h2>{tenant.name}</h2>
        </div>
      )}

      <div className="user-menu">
        <div className="user-info">
          <img
            src="/profile.jpg"
            alt="User Avatar"
            className="avatar"
          />
          <span className="username">{localStorage.getItem("username")}</span>

          <div className="dropdown-menu">
            <div className="dropdown-item">👤 My Profile</div>
            <div className="dropdown-item">⚙️ Settings</div>
            <div className="dropdown-item" onClick={handleSignOut}>↩️ Sign out</div>
          </div>
        </div>
      </div>
    </div>
  );
}
