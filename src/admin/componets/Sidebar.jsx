import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = ({
  isSidebarOpen,
  isMobileSidebarOpen,
  openMenus,
  toggleSidebar,
  toggleMobileSidebar,
  closeMobileSidebar,
  toggleSubMenu,
}) => {
  const location = useLocation(); // ✅ Detect current path

  // ✅ Menu items (Master Data only has Education & Institutions)
  const menuItems = [
    {
      id: "dashboard",
      text: "Dashboard",
      icon: "bi bi-speedometer2",
      path: "/admin/dashboard",
    },
    {
      id: "masterdata",
      text: "Master Data",
      icon: "bi bi-collection",
      children: [
        { id: "education", text: "Education", path: "/admin/manage-education" },
        { id: "course", text: "Course", path: "/admin/manage-courses" },
        { id: "specialization", text: "Specialization", path: "/admin/manage-specializations" },
        { id: "institutions", text: "Institutions", path: "/admin/manage-institutions" },
        { id: "skill", text: "Skill", path: "/admin/manage-skills" },
        { id: "jobTitle", text: "Job Title", path: "/admin/manage-job-titles" },
        { id: "noticePeriods", text: "Notice Period", path: "/admin/manage-notice-periods" },
        { id: "experience", text: "Experience", path: "/admin/manage-experience" },
        { id: "courseType", text: "Course Type", path: "/admin/manage-course-types" },
        { id: "schoolBoard", text: "School Board", path: "/admin/manage-school-boards" },
        { id: "schoolMedium", text: "School Medium", path: "/admin/manage-school-medium" },
      ],
    },
    {
      id: "settings",
      text: "Settings",
      icon: "bi bi-gear",
      children: [
        { id: "general", text: "General", path: "/settings/general" },
        { id: "security", text: "Security", path: "/settings/security" },
        { id: "privacy", text: "Privacy", path: "/settings/privacy" },
      ],
    },
  ];

  // ✅ Recursive menu rendering
  const renderMenu = (items, level = 0) =>
    items.map((item) => {
      const hasChildren = !!item.children;
      const showText = isSidebarOpen || isMobileSidebarOpen;
      const isActive = item.path && location.pathname === item.path;

      return (
        <React.Fragment key={item.id}>
          <li
            className={`menu-item ${hasChildren ? "has-children" : ""} ${
              isActive ? "active" : ""
            }`}
            onClick={() =>
              hasChildren ? toggleSubMenu(item.id) : closeMobileSidebar()
            }
            style={{ paddingLeft: `${level * 15}px` }}
          >
            {hasChildren ? (
              <div className="menu-link d-flex justify-content-between align-items-center">
                <span className="menu-label">
                  {item.icon && <i className={`${item.icon} me-2`}></i>}
                  {showText && item.text}
                </span>
                {showText && (
                  <i
                    className={`bi ${
                      openMenus[item.id] ? "bi-chevron-up" : "bi-chevron-down"
                    }`}
                  ></i>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className={`menu-link d-flex align-items-center ${
                  isActive ? "active-link" : ""
                }`}
                onClick={closeMobileSidebar}
              >
                {item.icon && <i className={`${item.icon} me-2`}></i>}
                {showText && item.text}
              </Link>
            )}
          </li>

          {hasChildren && openMenus[item.id] && showText && (
            <ul className="submenu">{renderMenu(item.children, level + 1)}</ul>
          )}
        </React.Fragment>
      );
    });

  return (
    <>
      <aside
        className={`sidebar ${isSidebarOpen ? "expanded" : "collapsed"} ${
          isMobileSidebarOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar-header">
          {(isSidebarOpen || isMobileSidebarOpen) && <h4>Admin Panel</h4>}
          <button className="toggle-btn" onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </button>
        </div>

        <ul className="menu-list mt-4">{renderMenu(menuItems)}</ul>
      </aside>

      {isMobileSidebarOpen && (
        <div className="overlay" onClick={closeMobileSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
