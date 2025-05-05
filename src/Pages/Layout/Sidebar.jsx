import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaUsers, FaBars } from "react-icons/fa";
import { MdOutlinePhonelinkSetup, MdManageAccounts } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { IoBriefcaseSharp } from "react-icons/io5";
import { RiHomeOfficeFill } from "react-icons/ri";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { MdNoteAlt } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { PiNotebookFill } from "react-icons/pi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { BsDatabaseFillGear } from "react-icons/bs";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa6";
import { PiNotepadFill } from "react-icons/pi";
import { ImLoop } from "react-icons/im";
import { IoMailSharp } from "react-icons/io5";
import { GrDocumentConfig } from "react-icons/gr";
import { HiTemplate } from "react-icons/hi";
const iconMap = {
  Home: <IoHomeSharp />,
  Borrower: <FaUsers />,
  Accounts: <MdManageAccounts />,
  Tenant: <RiHomeOfficeFill />,
  LegalSetup: <MdOutlinePhonelinkSetup />,
  Cases: <IoBriefcaseSharp />,
  Notices: <MdNoteAlt />,
  Reports: <BiSolidReport />,
  Loans: <FaBookOpen />,
  Invoices: <FaFileInvoiceDollar />,
  ManageData: <BsDatabaseFillGear />,
  AdminLoan: <FaHandHoldingUsd />,
  AdminCases: <FaHospitalUser />,
  AdminNotices: <PiNotepadFill />,
  ReportCases: <IoBriefcaseSharp />,
  ReportNotice: <PiNotebookFill />,
  OrgSetup:<ImLoop />,
  NoticeSetup:<IoMailSharp />,
  Template:<HiTemplate />,
  StageConfig:<GrDocumentConfig />,
  
};

export default function Sidebar() {
  const role = localStorage.getItem("role") || "Administrator";
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const navItems = {
    Administrator: [
      { name: "Home", path: "/admin" },

      { name: "Borrower", path: "/borrower" },

      {
        name: "OrgSetup",
        children: [
          { name: "Accounts", path: "/accounts" },
          { name: "Tenant", path: "/tenant" },
        ],
      },

      { name: "LegalSetup", path: "/legalSetup" },

      {
        name: "ManageData",
        children: [
          { name: "AdminLoan", path: "/admin-loans" },
          { name: "AdminCases", path: "/admin-cases" },
          { name: "AdminNotices", path: "/admin-notices" },
        ],
      },

      {
        name: "NoticeSetup",
        children: [
          { name: "Template", path: "/template" },
          { name: "StageConfig", path: "/stageconfig" },
        ],
      },
    ],

    User: [
      { name: "Home", path: "/user" },
      { name: "Cases", path: "/cases" },
      { name: "Notices", path: "/user-notice" },
      {
        name: "Reports",
        children: [
          { name: "ReportCases", path: "/report-cases" },
          { name: "ReportNotice", path: "/report-notices" },
        ],
      },
      { name: "Loans", path: "/loans" },
      { name: "Invoices", path: "/invoices" },
    ],

    Legal: [
      { name: "Home", path: "/legal" },
      { name: "Cases", path: "/lawyer-cases" },
      { name: "Notices", path: "/notice" },
      {
        name: "Reports",
        children: [
          { name: "ReportCases", path: "" },
          { name: "ReportNotice", path: "" },
        ],
      },
      { name: "Invoices", path: "/legalInvoice" },
    ],
  };

  const toggleSidebar = () => setIsExpanded((prev) => !prev);
  const handleSubmenuToggle = (name) => {
    setOpenSubmenu((prev) => (prev === name ? null : name));
  };

  return (
    <div
      className={`sidenav-container ${isExpanded ? "expanded" : "collapsed"}`}
    >
      <nav className="nav">
        <div className="nav__brand">
          <div className="nav__icon nav__icon--menu" onClick={toggleSidebar}>
            <FaBars />
          </div>
          {isExpanded && <span className="nav__brand-logo"></span>}
        </div>

        <ul className="nav__list">
          {(navItems[role] || []).map((item) => (
            <li className="nav__item" key={item.name}>
              {item.children ? (
                <>
                  <div
                    className="nav__link"
                    onClick={() => handleSubmenuToggle(item.name)}
                  >
                    <span className="nav__icon">{iconMap[item.name]}</span>
                    {isExpanded && (
                      <span className="nav__name">{item.name}</span>
                    )}
                    {isExpanded && (
                      <IoChevronDownOutline className="toggle-icon" />
                    )}
                  </div>
                  {openSubmenu === item.name && (
                    <ul className="nav__drop">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link to={child.path} className="nav__sublink">
                            <span className="nav__icon">
                              {iconMap[child.name]}
                            </span>
                            {isExpanded && (
                              <span className="nav__subname">{child.name}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.path} className="nav__link">
                  <span className="nav__icon">{iconMap[item.name]}</span>
                  {isExpanded && <span className="nav__name">{item.name}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
