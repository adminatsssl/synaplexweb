import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './TopNavbar.css';

export default function TopNavbar() {
  const [tenant, setTenant] = useState(null);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/"); // redirect to homepage/login page
  };
  useEffect(() => {
    axios
      .get("/odata/pos_tenant/v1/Tenants?$top=1&$expand=TenantLogo")
      .then((res) => {
        const data = res.data.value[0];
        const base64 = data.TenantLogo?.Contents;
        const imageUrl = base64 ? `data:image/png;base64,${base64}` : null;

        setTenant({
          name: data.Name,
          logoUrl: imageUrl
        });
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
            src="http://localhost:8080/img/Home$Images$LayweriMAGE.jpg?638816259597369252"
            alt="User Avatar"
            className="avatar"
          />
          <span className="username">{localStorage.getItem("username")}</span>

          <div className="dropdown-menu">
            <div className="dropdown-item">👤 My Profile</div>
            <div className="dropdown-item">⚙️ Setttings</div>
            <div className="dropdown-item" onClick={handleSignOut}>↩️ Sign out</div>
          </div>
        </div>
      </div>
    </div>
  );
}
