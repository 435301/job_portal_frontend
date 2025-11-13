import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { logoutAdmin } from "../../redux/slices/adminSlice";
import { useDispatch } from "react-redux";

const Header = ({ toggleMobileSidebar, showProfileMenu, setShowProfileMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin/login");
  };


  return (
    <header className="topbar">
      <div className="left-section">
        <button
          className="btn-toggle d-block d-md-none"
          onClick={toggleMobileSidebar}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>

      <div className="search-box d-none d-md-flex">
        <h5 className="text-white mt-2">Welcome to, Aftergraduate Admin</h5>
      </div>

      <div className="right-section">
        <i className="bi bi-bell"></i>
        <div
          className="user-avatar"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <i className="bi bi-people"></i>
        </div>

        {showProfileMenu && (
          <div className="profile-menu shadow">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <hr />
            <Link to="/logout" className="logout" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
