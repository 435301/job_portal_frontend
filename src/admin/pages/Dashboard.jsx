import React, { useState } from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSidebar = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  const toggleSubMenu = (id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="admin-layout">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        openMenus={openMenus}
        toggleSidebar={toggleSidebar}
        toggleMobileSidebar={toggleMobileSidebar}
        closeMobileSidebar={closeMobileSidebar}
        toggleSubMenu={toggleSubMenu}
      />

      <div className="main-area">
        <Header
          toggleMobileSidebar={toggleMobileSidebar}
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
        />

        <main className="content p-4">
          <h3 className="mb-4 fw-bold">Welcome to the Dashboard</h3>
          <p className="text-muted">
            This is your main admin area. Add widgets, charts, or tables here.
          </p>

          {/* Dashboard Cards */}
          <Container fluid className="mt-4">
            <Row className="g-3 mb-3">
              {/* Users */}
              <Col lg={3} md={6} sm={12}>
                <Card className="shadow-sm border-0 rounded-4  dashboard-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="icon-boxs bg-primary-subtle text-primary me-3">
                      <i className="bi bi-people-fill"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Total Users</h6>
                      <h4 className="fw-bold mb-0">1,245</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Projects */}
              <Col lg={3} md={6} sm={12}>
                <Card className="shadow-sm border-0 rounded-4  dashboard-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="icon-boxs bg-success-subtle text-success me-3">
                      <i className="bi bi-kanban"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Active Projects</h6>
                      <h4 className="fw-bold mb-0">37</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Revenue */}
              <Col lg={3} md={6} sm={12}>
                <Card className="shadow-sm border-0 rounded-4  dashboard-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="icon-boxs bg-warning-subtle text-warning me-3">
                      <i className="bi bi-currency-rupee"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Revenue</h6>
                      <h4 className="fw-bold mb-0">$8,520</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Tasks */}
              <Col lg={3} md={6} sm={12}>
                <Card className="shadow-sm border-0 rounded-4  dashboard-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="icon-boxs bg-danger-subtle text-danger me-3">
                      <i className="bi bi-list-check "></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Pending Tasks</h6>
                      <h4 className="fw-bold mb-0">14</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
             <Row className="g-3">
              {/* Users */}
              <Col lg={3} md={6} sm={12}>
                <Card className="shadow-sm border-0 rounded-4  dashboard-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="icon-boxs bg-primary-subtle text-primary me-3">
                      <i className="bi bi-people-fill"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Total Users</h6>
                      <h4 className="fw-bold mb-0">1,245</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Projects */}
              <Col lg={3} md={6} sm={12}>
                <Card className="shadow-sm border-0 rounded-4  dashboard-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="icon-boxs bg-success-subtle text-success me-3">
                      <i className="bi bi-kanban"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Active Projects</h6>
                      <h4 className="fw-bold mb-0">37</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Revenue */}
              <Col lg={3} md={6} sm={12}>
                <Card className="shadow-sm border-0 rounded-4  dashboard-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="icon-boxs bg-warning-subtle text-warning me-3">
                      <i className="bi bi-currency-rupee"></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Revenue</h6>
                      <h4 className="fw-bold mb-0">$8,520</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Tasks */}
              <Col lg={3} md={6} sm={12}>
                <Card className="shadow-sm border-0 rounded-4  dashboard-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="icon-boxs bg-danger-subtle text-danger me-3">
                      <i className="bi bi-list-check "></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Pending Tasks</h6>
                      <h4 className="fw-bold mb-0">14</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
