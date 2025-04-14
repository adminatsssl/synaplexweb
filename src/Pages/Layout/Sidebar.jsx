import { useState } from "react";
import { FaTachometerAlt, FaUsers, FaCog, FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoBriefcaseSharp } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";

import './Sidebar.css';

const iconMap = {
  Dashboard: <FaTachometerAlt />,
  Users: <FaUsers />,
  Settings: <FaCog />,
  Profile: <CgProfile />,
  Cases: <IoBriefcaseSharp />,
  Reports: <TbReportSearch />,
};

export default function Sidebar() {
  const role = localStorage.getItem("role");
  const navItems = {
    Administrator: ["Dashboard", "Users", "Settings"],
    User: ["Dashboard", "Profile"],
    Legal: ["Cases", "Reports"],
  };

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
      {/* Hamburger Button */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <FaBars className="icon" />
      </div>

      <ul>
        {(navItems[role] || []).map((item) => (
          <li key={item} className="nav-item">
            <span className="icon">{iconMap[item]}</span>
            {isOpen && <span className="text">{item}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
