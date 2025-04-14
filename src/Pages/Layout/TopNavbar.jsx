export default function TopNavbar({ username }) {
    const role = localStorage.getItem("role");
  
    return (
      <div className="top-navbar">
        <h2>
          Homepage <span className="role">{role}</span>
        </h2>
        <div className="user-info">{username}</div>
      </div>
    );
  }
  