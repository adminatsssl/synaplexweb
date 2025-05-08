import React, { useState } from 'react';
import "./AdminAccount.css";
import Layout from '../../../Layout/Layout';
import IconButton from '../../../ReusableComponents/IconButton';
import ReusableGrid from '../../../ReusableComponents/ReusableGrid';
import AddButton from '../../../ReusableComponents/AddButton';
import AdminAccountPopup from "./AdminAccountPopup";

const AdminAccount = () => {
  const [activeTab, setActiveTab] = useState("Admin Info");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [users, setUsers] = useState([
    {
      fullName: "demo_administrator",
      login: "demo_administrator",
      role: "Administrator",
      lastLogin: "5/6/2025, 12:09 PM",
      active: true,
      isWebServiceUser: false,
      isLocal: true,
    },
    {
      fullName: "demo_user",
      login: "demo_user",
      role: "User",
      lastLogin: "5/6/2025, 12:10 PM",
      active: true,
      isWebServiceUser: false,
      isLocal: true,
    },
    {
      fullName: "tushar",
      login: "tushar",
      role: "User",
      lastLogin: "5/7/2025, 12:13 PM",
      active: true,
      isWebServiceUser: false,
      isLocal: true,
    },
    {
      fullName: "ujjwal",
      login: "ujjwal",
      role: "Legal",
      lastLogin: "4/24/2025, 11:22 AM",
      active: true,
      isWebServiceUser: false,
      isLocal: true,
    },
  ]);

  const handleSaveUser = (newUser) => {
    setUsers(prevUsers => {
      const index = prevUsers.findIndex(u => u.login === newUser.login);
      if (index >= 0) {
        const updated = [...prevUsers];
        updated[index] = newUser;
        return updated;
      } else {
        return [...prevUsers, newUser];
      }
    });
  };

  const handleEditUser = (user) => {
    setEditUserData(user);
    setIsPopupOpen(true);
  };

  const columns = [
    { key: "fullName", label: "Full name" },
    { key: "login", label: "Login" },
    { key: "role", label: "Roles" },
    { key: "lastLogin", label: "Last login" },
    {
      key: "active",
      label: "Active",
      render: (row) => (
        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {row.active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "isWebServiceUser",
      label: "Web service user",
      render: (row) => (row.isWebServiceUser ? "Yes" : "No"),
    },
    {
      key: "isLocal",
      label: "Local",
      render: (row) => (row.isLocal ? "Yes" : "No"),
    },
    {
      key: "actions",
      label: "",
      disableFilter: true,
      render: (row) => (
        <div className="AdminAccount-Actionbtn">
          <IconButton type="edit" onClick={() => handleEditUser(row)} />
          <IconButton type="delete" />
        </div>
      ),
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Admin Info":
        return (
          <div className="p-4">
            <div className="flex gap-2 mb-4">
              <AddButton text="New local user" onClick={() => {
                setEditUserData(null);
                setIsPopupOpen(true);
              }} />
            </div>
            <ReusableGrid columns={columns} data={users} />
            {isPopupOpen && (
              <AdminAccountPopup
                onClose={() => {
                  setIsPopupOpen(false);
                  setEditUserData(null);
                }}
                onSave={handleSaveUser}
                userData={editUserData}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="adminaccount-container">
        <h2>Account Overview</h2>
        <div className="adminaccount-tabs">
          <button
            className={`adminaccount-tab-btn ${activeTab === "Admin Info" ? "active" : ""}`}
            onClick={() => setActiveTab("Admin Info")}
          >
            Local User
          </button>
        </div>
        <div className="adminaccount-tab-content">
          {renderTabContent()}
        </div>
      </div>
    </Layout>
  );
};

export default AdminAccount;
