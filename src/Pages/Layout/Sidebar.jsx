import { useState } from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import {  FaUsers, FaCog, FaBars } from "react-icons/fa";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { IoBriefcaseSharp } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { GoHomeFill } from "react-icons/go";
import { RiHomeOfficeFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import './Sidebar.css';

// Icon map for navigation items
const iconMap = {
  Home: <GoHomeFill />,
  Borrower: <FaUsers />,
  Accounts: <MdManageAccounts  />,
  Tenant: <RiHomeOfficeFill  />,
  LegalSetup: <MdOutlinePhonelinkSetup  />,
  Cases: <IoBriefcaseSharp />,
  Notices: <TbReportSearch />,
  Reports: <TbReportSearch />,
  Loans: <FaCog />,
  Invoices: <FaCog />,
};

export default function Sidebar() {
  const role = localStorage.getItem("role");
  const navItems = {
    Administrator: [
      { name: "Home", path: "/admin" },
      { name: "Borrower", path: "/borrower" },
      { name: "Accounts", path: "/accounts" },
      { name: "Tenant", path: "/tenant" },
      { name: "LegalSetup", path: "/legalSetup" },
    ],
    User: [
      { name: "Home", path: "/user" },
      { name: "Cases", path: "/cases" },
      { name: "Notices", path: "/notices" },
      { name: "Reports", path: "/reports" },
      { name: "Loans", path: "/loans" },
      { name: "Invoices", path: "/invoices" },
    ],
    Legal: [
      { name: "Home", path: "/legal" },
      { name: "Cases", path: "/cases" },
      { name: "Notices", path: "/notices" },
      { name: "Reports", path: "/reports" },
      { name: "Invoices", path: "/invoices" },
    ],
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
      {/* Hamburger Button */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <FaBars className="icon" />
      </div>

      <ul>
        {/* Map over the navItems for the current role and display links */}
        {(navItems[role] || []).map((item) => (
          <li key={item.name} className="nav-item">
            <Link to={item.path}>
              <span className="icon">{iconMap[item.name]}</span>
              {isOpen && <span className="text">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
