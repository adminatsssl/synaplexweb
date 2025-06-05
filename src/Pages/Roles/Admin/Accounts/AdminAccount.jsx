import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [users, setUsers] = useState([]);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });


  useEffect(() => {
    axios.get(`/api/api/users`, {
      headers: getAuthHeaders()
    })
      .then(response => {
        const mappedUsers = response.data.map(user => ({
          id: user.id,
          fullName: user.fullName || user.username,
          login: user.username,
          email: user.email,
          role: user.role,
        }));
        setUsers(mappedUsers);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

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
    { key: "login", label: "User Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
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
