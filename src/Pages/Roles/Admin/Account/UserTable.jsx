import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./UserTable.css";
import NewAccountPopup from './addUserPopup';

const UserTable = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);

    // Fetch users
    const getUsers = () => {
        axios.get("/odata/published_odata_service/v1/1/Accounts?$expand=UserRoles")
            .then((res) => setAllUsers(res.data.value))
            .catch((err) => console.error("GET error:", err));
    };


  
  const handleSave = (formData) => {

    console.log('Form data:', formData);
    const newUser = {
        FullName: formData.fullName,
        Email: formData.email,
        IsLocalUser: true,
        Name: formData.userName,
        Password: formData.newPassword,
        LastLogin: new Date().toISOString(),
        Blocked: formData.blocked,
        BlockedSince: formData.blocked ? new Date().toISOString() : null,
        Active: formData.active,
        WebServiceUser: false,
        UserRoles: [{ "@id": `UserRoles('${formData.userRole}')` }]
      };
      
      console.log('New user object:', newUser);
      postUser(newUser)
    // Process the data here
    setIsPopupOpen(false);
  };


    // Create new local user
    const postUser = (formData) => {
        // const newUsername = `ashwin_${uuidv4()}`;
        // const newUser = {
        //     FullName: "ashwin",
        //     Email: "ashwin@example.com",
        //     IsLocalUser: true,
        //     Name: newUsername,
        //     Password: "MyPassword123",
        //     LastLogin: new Date().toISOString(),
        //     Blocked: false,
        //     BlockedSince: null,
        //     Active: true,
        //     WebServiceUser: false,
        //     UserRoles: [{ "@id": "UserRoles('User')" }]
        // };

        axios.post("/odata/published_odata_service/v1/1/Accounts", formData, {
            headers: { "Content-Type": "application/json" }
        })
        .then(() => getUsers())
        .catch((err) => console.error("POST error:", err));
    };

    // Edit click
    const handleEditClick = (user) => {
        setEditUser({
            ...user,
            Roles: user.UserRoles?.map(role => role.Name || role["@id"]?.split("'")[1]) || [],
            Language: user.Language || '',
            TimeZone: user.TimeZone || ''
        });
        setShowEditPopup(true);
    };

    // Save edited user
    const handleSaveEdit = () => {
        if (!editUser?.Name) {
            console.error("No user selected for editing.");
            return;
        }

        const updatedUser = {
            FullName: editUser.FullName,
            Email: editUser.Email,
            IsLocalUser: editUser.IsLocalUser,
            Active: editUser.Active,
            Blocked: editUser.Blocked,
            WebServiceUser: editUser.WebServiceUser,
            LastLogin: editUser.LastLogin || new Date().toISOString(),
            //Language: editUser.Language,
            //TimeZone: editUser.TimeZone,
            "UserRoles@delta": editUser.Roles.map(role => ({
                "@id": `UserRoles('${role}')`
            }))
        };

        axios.patch(`/odata/published_odata_service/v1/1/Accounts('${editUser.Name}')`, updatedUser, {
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
            getUsers();
            setShowEditPopup(false);
        })
        .catch((error) => {
            console.error("PATCH error:", error.response?.data || error.message);
            alert("Failed to update user. Please try again.");
        });
    };

    // Delete user
    const handleDelete = (username) => {
        axios.delete(`/odata/published_odata_service/v1/1/Accounts('${username}')`)
            .then(() => getUsers())
            .catch(err => console.error("DELETE error:", err));
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="user-table">
            <div className="table-header">
                <h2>Local Users</h2>
                <button className="new-btn" onClick={()=>setIsPopupOpen(true)}>New Local User</button>
            </div>

            <table>
                <thead>
                    <tr>
                    <th class="bold-header">Full Name</th>
<th class="bold-header">Login</th>
<th class="bold-header">Roles</th>
<th class="bold-header">Last Login</th>
<th class="bold-header">Active</th>
<th class="bold-header">Web Service</th>
<th class="bold-header">Local</th>
<th class="bold-header">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((u, index) => (
                        <tr key={index}>
                            <td>{u.FullName}</td>
                            <td>{u.Name}</td>
                            <td>{u.UserRoles?.map(role => role.Name || role["@id"]?.split("'")[1]).join(', ') || '—'}</td>
                            <td>{new Date(u.LastLogin).toLocaleString()}</td>
                            <td>{u.Active ? "Active" : "Inactive"}</td>
                            <td>{u.WebServiceUser ? "Yes" : "No"}</td>
                            <td>{u.IsLocalUser ? "Yes" : "No"}</td>
                            <td>
                                <button onClick={() => handleEditClick(u)}>✏️</button>
                                <button onClick={() => handleDelete(u.Name)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEditPopup && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h3>Edit User Account</h3>
                            <button className="close-btn" onClick={() => setShowEditPopup(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={editUser.FullName || ''}
                                    onChange={(e) => setEditUser({ ...editUser, FullName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Username (Login)</label>
                                <input type="text" value={editUser.Name || ''} 
                                onChange={(e) => setEditUser({ ...editUser, Email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={editUser.Email || ''}
                                    onChange={(e) => setEditUser({ ...editUser, Email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>User Role</label>
                                <select
                                    value={editUser.Roles[0] || ''}
                                    onChange={(e) => setEditUser({ ...editUser, Roles: [e.target.value] })}
                                >
                                    <option value="User">User</option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Legal">Legal</option>
                                </select>
                            </div>
                            <div className="form-group-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={editUser.Active}
                                        onChange={(e) => setEditUser({ ...editUser, Active: e.target.checked })}
                                    />
                                    Active
                                </label>
                            </div>
                            <div className="form-group-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={editUser.Blocked}
                                        onChange={(e) => setEditUser({ ...editUser, Blocked: e.target.checked })}
                                    />
                                    Blocked
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Language</label>
                                <select
                                    value={editUser.Language}
                                    onChange={(e) => setEditUser({ ...editUser, Language: e.target.value })}
                                >
                                    <option value="">Select language</option>
                                    <option value="en">English</option>
                                    <option value="hi">Hindi</option>
                                    <option value="es">Spanish</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Time Zone</label>
                                <select
                                    value={editUser.TimeZone}
                                    onChange={(e) => setEditUser({ ...editUser, TimeZone: e.target.value })}
                                >
                                    <option value="">Select time zone</option>
                                    <option value="IST">IST</option>
                                    <option value="UTC">UTC</option>
                                    <option value="EST">EST</option>
                                </select>
                            </div>
                        
                        </div>
                        <div className="modal-footer">
                            <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                            <button className="cancel-btn" onClick={() => setShowEditPopup(false)}>❌ Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <NewAccountPopup 
        showPopup={isPopupOpen}
        closePopup={() => setIsPopupOpen(false)}
        onSave={handleSave}
      />
        </div>
    );
};

export default UserTable;
