import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "../assets/css/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Example image imports (update paths accordingly)
import bgRightHiring from "../assets/img/bg-right-hiring.svg";


const JobDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
    }, []);

    return (
        <>
            {/* ====== Navbar ====== */}
            <div className="container-fluid header position-relative overflow-hidden p-0">
                <Navbar />

                {/* Breadcrumb / Search Section */}
                <div className="container-fluid bg-breadcrumb py-5">

                </div>
            </div>

            {/* ===== Header Section ===== */}
            <div
                className="container mt-4 py-4 px-5 mb-4"
                style={{
                    background:
                        "linear-gradient(180deg, #E8F4FA 0%, #FFFFFF 100%)",
                    borderRadius: "0 0 12px 12px",
                }}
            >
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                        <h2 className="fw-bold mb-1 text-dark">Manage Job Postings</h2>
                        <p className="text-secondary mb-0">
                            Track all job and invite responses here.
                        </p>
                    </div>
                    <a href="/basic-job-details" className="btn btn-dark rounded-pill px-4 py-2 mt-3 mt-md-0">
                        Post a Job <i className="bi bi-arrow-right ms-2"></i>
                    </a>
                </div>
            </div>

            {/* ===== Main Section ===== */}
            <div className="container pb-5">
                <div className="row g-4">
                    {/* ===== Filter Sidebar ===== */}
                    <div className="col-lg-3">
                        <div className="filter-panel">
                            <h5>Filter</h5>
                            <div className="applied-count">Applied (3)</div>
                            <div className="mt-3 mb-3">
                                <label htmlFor="location" className="form-label">
                                    Search
                                </label>
                                <input type="text" placeholder="Search Location" className="form-control py-2" />
                            </div>

                            {/* <div className="mb-3">
                                <label className="form-label">Industry</label>
                                {[
                                    { id: "software", label: "Software", count: 28 },
                                    { id: "finance", label: "Finance", count: 40 },
                                    { id: "management", label: "Management", count: 2 },
                                ].map((item) => (
                                    <div
                                        className="form-check d-flex justify-content-between align-items-center"
                                        key={item.id}
                                    >
                                        <div className="d-flex align-items-center">
                                            <input className="form-check-input me-2" type="checkbox" id={item.id} />
                                            <label className="form-check-label" htmlFor={item.id}>
                                                {item.label}
                                            </label>
                                        </div>
                                        <span className="number">{item.count}</span>
                                    </div>
                                ))}
                            </div> */}

                            <div className="mb-3">
                                <label className="form-label">Job posted by</label>
                                {["Me", "Other"].map((type, index) => (
                                    <div className="form-check d-flex align-items-center" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={type.toLowerCase().replace(" ", "")}
                                        />
                                        <label className="form-check-label ms-1" htmlFor={type.toLowerCase().replace(" ", "")}>
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* ===== Job Listing Section ===== */}
                    <div className="col-lg-9 education  job-portal">
                        <div className=" ms-4 d-flex justify-content-between align-items-center mb-3 flex-wrap">
                            <h6 className="fw-bold mb-2">12 jobs</h6>
                            <div className="d-flex align-items-center gap-2">
                                <select className="form-select form-select-sm w-auto">
                                    <option>Sort by New Post</option>
                                    <option>Sort by Old Post</option>
                                </select>
                              
                            </div>
                        </div>
                        <div className="ms-4 border rounded-3 bg-white mb-3">
                            {/* Job Cards */}
                            {[1, 2, 3].map((job) => (

                                <div
                                    key={job}
                                    className="border-bottom "
                                >
                                    <div className="p-3 d-flex justify-content-between  flex-wrap">
                                        <div className="d-flex align-items-baseline gap-3">
                                            {/* Checkbox */}
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input mt-1"
                                                    style={{ width: "23px", height: "19px", background: "#e4e2e231", border: "1px solid #00000036" }}
                                                />
                                            </div>

                                            {/* Job details */}
                                            <div>
                                                <h6 className="fw-semibold mb-1 text-dark">
                                                    {job === 1
                                                        ? "Field Marketing Executive"
                                                        : job === 2
                                                            ? "UI/UX Desig/ Developer"
                                                            : "ield Marketing Executive"}
                                                </h6>
                                                <p className="text-muted small mb-4 mb-md-2">
                                                    <i className="bi bi-geo-alt"></i> San Francisco, CA
                                                </p>
                                                <span
                                                    className="badge rounded-pill px-3"
                                                    style={{
                                                        backgroundColor: "#E5F9F3",
                                                        color: "#09A084", padding: "6px"
                                                    }}
                                                >
                                                    Classified
                                                </span>
                                            </div>
                                        </div>


                                        <div className="text-center small text-secondary">
                                            <p className="mb-1 fw-semibold text-dark">Total Openings</p>
                                            <h5 className="mb-0">10</h5>
                                        </div>

                                        <div className="text-center small">
                                            <p className="mb-1 fw-semibold text-dark">Views</p>
                                            <h5 className="text-danger mb-0">05</h5>
                                        </div>

                                        <div className="text-center small">
                                            <p className="mb-1 fw-semibold text-dark">Applicants</p>
                                            <h5 className="text-info mb-0">56</h5>
                                        </div>



                                        <div className="text-end d-flex flex-column align-items-end cal">
                                            <div className="d-flex align-items-center mb-3">
                                                <button className="btn btn-primary btn-sm rounded-pill py-1">
                                                    View more
                                                </button>

                                                {/* More dropdown */}
                                                <div className="dropdown">
                                                    <button
                                                        className="btn  border-0"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="bi bi-three-dots-vertical fs-5 text-secondary"></i>
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end shadow-sm small">
                                                        <li>
                                                            <button className="dropdown-item">
                                                                <i className="bi bi-pencil me-2"></i>Edit Job
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item">
                                                                <i className="bi bi-eye me-2"></i>Preview
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item text-danger">
                                                                <i className="bi bi-trash me-2"></i>Delete
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <p className="small mt-2 mb-0 text-primary view-call">
                                                Posted on <span className="text-muted border-end mx-2"></span> 10 July, 2025
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-end mt-4">
                                <li className="page-item disabled">
                                    <span className="page-link">&laquo;</span>
                                </li>
                                <li className="page-item active">
                                    <span className="page-link">1</span>
                                </li>
                                <li className="page-item">
                                    <span className="page-link">2</span>
                                </li>
                                <li className="page-item">
                                    <span className="page-link">3</span>
                                </li>
                                <li className="page-item">
                                    <span className="page-link">&raquo;</span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>


            {/* ====== Footer ====== */}
            < Footer />
        </>
    );
};

export default JobDetails;
