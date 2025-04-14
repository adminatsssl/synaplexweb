import { FaTachometerAlt, FaUsers, FaCog } from "react-icons/fa";

const iconMap = {
  Dashboard: <FaTachometerAlt />,
  Users: <FaUsers />,
  Settings: <FaCog />,
};

export default function Sidebar() {
  const role = localStorage.getItem("role");

  const navItems = {
    Administrator: ["Dashboard", "Users", "Settings"],
    User: ["Dashboard", "Profile"],
    Legal: ["Cases", "Reports"],
  };

  return (
    <div className="sidebar">
      <ul>
        {(navItems[role] || []).map((item) => (
          <li key={item}>
            <span className="icon">{iconMap[item]}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
