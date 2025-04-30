import { useEffect, useState } from "react";
import axios from "axios";

export default function TopNavbar() {
  const [tenant, setTenant] = useState(null);

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
    <div className="top-navbar">
      {tenant && (
        <div
          className="tenant-info"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
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
      <div className="user-info" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="http://localhost:8080/img/Home$Images$LayweriMAGE.jpg?638816259597369252"
          alt="User Avatar"
          style={{
            height: "35px",
            width: "35px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
        <span>{localStorage.getItem("username")}</span>
      </div>
    </div>
  );
}
