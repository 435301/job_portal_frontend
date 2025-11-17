import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "../assets/css/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import icon1 from "../assets/img/icon-1.png";

const Candidates = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
    }, []);

    return (
        <>
            {/* ====== Navbar ====== */}
            <div className="container-fluid header position-relative overflow-hidden p-0">
                <Navbar />

                {/* Breadcrumb / Search Section */}
                <div className="container-fluid bg-breadcrumb">
                    <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
                        <h3 className="text-white mb-4 wow fadeInDown" data-wow-delay="0.1s">
                            Find Your Dream Jobs
                        </h3>

                        <div
                            className="search-bar ms-5 ps-4 bg-white shadow-sm d-flex align-items-center justify-content-between px-3 py-2 flex-wrap"
                            style={{ maxWidth: "708px", gap: "4px" }}
                        >
                            {/* Job Title Input */}
                            <div className="d-flex align-items-center flex-grow-1 border-end flex-nowrap">
                                <i className="bi bi-briefcase-fill text-muted"></i>
                                <input
                                    type="text"
                                    className="form-control border-0 shadow-none"
                                    placeholder="Search by Job title, skill"
                                />
                            </div>

                            {/* Location Input */}
                            <div className="d-flex align-items-center pe-3 flex-shrink-1" style={{ minWidth: "150px" }}>
                                <i className="bi bi-geo-alt me-2 text-muted"></i>
                                <select
                                    className="form-select border-0 shadow-none p-0"
                                    style={{ minWidth: "100px", fontSize: "15px" }}
                                >
                                    <option>Location</option>
                                    <option>New York</option>
                                    <option>San Francisco</option>
                                    <option>Chicago</option>
                                    <option>London</option>
                                    <option>Remote</option>
                                </select>
                            </div>

                            {/* Remote Switch */}
                            <div className="d-flex align-items-center pe-3 flex-shrink-0">
                                <div className="form-check form-switch mb-0 me-2">
                                    <input className="form-check-input" type="checkbox" id="remoteSwitch" />
                                </div>
                                <label className="form-check-label ms-1 text-muted small" htmlFor="remoteSwitch">
                                    Remote
                                </label>
                            </div>

                            {/* Search Button */}
                            <button className="btn btn-primary rounded-pill px-4 flex-shrink-0">Search jobs</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Section */}
            <section className="my-5 jobs-list">
                <div className="container">
                    <div className="row">
                        {/* Filter Sidebar */}
                        <div className="col-lg-3">
                            <div
                                className="filter-panel "

                            >
                                <h5 className="fw-bold mb-3">Filters</h5>

                                <div className="accordion" id="filterAccordion">

                                    {/* Company Type */}
                                    <div className="accordion-item border-0 mb-2">
                                        <h6 className="accordion-header">
                                            <button
                                                className="accordion-button py-2 px-0 bg-transparent shadow-none fw-semibold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#companyType"
                                            >
                                                Company type
                                            </button>
                                        </h6>
                                        <div
                                            id="companyType"
                                            className="accordion-collapse collapse show"
                                            data-bs-parent="#filterAccordion"
                                        >
                                            <div className="accordion-body py-2 px-0">
                                                {[
                                                    { label: "Corporate", count: 28 },
                                                    { label: "Foreign MNC", count: 40 },
                                                    { label: "Startup", count: 2 },
                                                    { label: "Others", count: 28 },
                                                ].map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className="d-flex justify-content-between align-items-center mb-2"
                                                    >
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={item.label.toLowerCase()}
                                                            />
                                                            <label
                                                                className="form-check-label small"
                                                                htmlFor={item.label.toLowerCase()}
                                                            >
                                                                {item.label}
                                                            </label>
                                                        </div>
                                                        <span
                                                            className="number "
                                                            style={{ fontSize: "0.75rem" }}
                                                        >
                                                            {item.count.toString().padStart(2, "0")}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Locations */}
                                    <div className="accordion-item border-0 mb-2">
                                        <h6 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed py-2 px-0 bg-transparent shadow-none fw-semibold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#locations"
                                            >
                                                Locations
                                            </button>
                                        </h6>
                                        <div
                                            id="locations"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#filterAccordion"
                                        >
                                            <div className="accordion-body py-2 px-0">
                                                {["Bengaluru", "Delhi / NCR", "Mumbai (All Areas)", "Hyderabad"].map(
                                                    (loc, i) => (
                                                        <div key={i} className="form-check mb-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={loc.toLowerCase().replace(/\s+/g, "")}
                                                            />
                                                            <label
                                                                className="form-check-label small"
                                                                htmlFor={loc.toLowerCase().replace(/\s+/g, "")}
                                                            >
                                                                {loc}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                                <a
                                                    href="#"
                                                    className="text-primary small text-decoration-none fw-semibold"
                                                >
                                                    90+ more
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Industry */}
                                    <div className="accordion-item border-0 mb-2">
                                        <h6 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed py-2 px-0 bg-transparent shadow-none fw-semibold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#industry"
                                            >
                                                Industry
                                            </button>
                                        </h6>
                                        <div
                                            id="industry"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#filterAccordion"
                                        >
                                            <div className="accordion-body py-2 px-0">
                                                {["IT Services", "Finance", "Healthcare", "Education"].map(
                                                    (item, i) => (
                                                        <div key={i} className="form-check mb-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={item.toLowerCase()}
                                                            />
                                                            <label
                                                                className="form-check-label small"
                                                                htmlFor={item.toLowerCase()}
                                                            >
                                                                {item}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Department */}
                                    <div className="accordion-item border-0 mb-2">
                                        <h6 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed py-2 px-0 bg-transparent shadow-none fw-semibold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#department"
                                            >
                                                Department
                                            </button>
                                        </h6>
                                        <div
                                            id="department"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#filterAccordion"
                                        >
                                            <div className="accordion-body py-2 px-0">
                                                {["Engineering", "Marketing", "Design", "Sales"].map(
                                                    (dept, i) => (
                                                        <div key={i} className="form-check mb-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={dept.toLowerCase()}
                                                            />
                                                            <label
                                                                className="form-check-label small"
                                                                htmlFor={dept.toLowerCase()}
                                                            >
                                                                {dept}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Experience */}
                                    <div className="accordion-item border-0 mb-2">
                                        <h6 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed py-2 px-0 bg-transparent shadow-none fw-semibold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#experience"
                                            >
                                                Experience
                                            </button>
                                        </h6>
                                        <div
                                            id="experience"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#filterAccordion"
                                        >
                                            <div className="accordion-body py-2 px-0">
                                                {["0-2 years", "3-5 years", "6-10 years", "10+ years"].map(
                                                    (exp, i) => (
                                                        <div key={i} className="form-check mb-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={exp.replace(/\s+/g, "")}
                                                            />
                                                            <label
                                                                className="form-check-label small"
                                                                htmlFor={exp.replace(/\s+/g, "")}
                                                            >
                                                                {exp}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Job Posting Date */}
                                    <div className="accordion-item border-0 mb-2">
                                        <h6 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed py-2 px-0 bg-transparent shadow-none fw-semibold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#jobPosting"
                                            >
                                                Job Posting date
                                            </button>
                                        </h6>
                                        <div
                                            id="jobPosting"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#filterAccordion"
                                        >
                                            <div className="accordion-body py-2 px-0">
                                                {["Last 24 hours", "Last 7 days", "Last 30 days", "All time"].map(
                                                    (date, i) => (
                                                        <div key={i} className="form-check mb-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="jobdate"
                                                                id={date.replace(/\s+/g, "")}
                                                            />
                                                            <label
                                                                className="form-check-label small"
                                                                htmlFor={date.replace(/\s+/g, "")}
                                                            >
                                                                {date}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Job List */}
                        <div className="col-lg-9 job-portal">
                            {/* Top bar (Show count + filters) */}
                            <div className="row ms-3 mb-3">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                        {/* Left Text */}
                                        <h6 className="mb-0">
                                            Showing <span className=" text-dark">14–60</span> of{" "}
                                            <span className="text-dark">563 Companies</span>
                                        </h6>

                                        {/* Right Dropdowns */}
                                        <div className="d-flex align-items-center gap-2 flex-wrap">
                                            <select className="form-select form-select-sm" style={{ width: "120px" }}>
                                                <option>Show 12</option>
                                                <option>Show 24</option>
                                                <option>Show 48</option>
                                            </select>

                                            <select className="form-select form-select-sm" style={{ width: "160px" }}>
                                                <option>Sort by New Post</option>
                                                <option>Sort by Old Post</option>
                                                <option>Sort by Popular</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Job Cards */}
                            <div className="row g-3 ms-3">
                                {[1, 2, 3, 4].map((job, i) => (
                                    <div key={i} className="col-12">
                                        <div className="card job-card border-0 h-100 rounded-3 shadow-sm">
                                            <div className="card-body">
                                                {/* Header Section */}
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    {/* Left: Profile Info */}
                                                    <div className="d-flex align-items-center">
                                                        <img src={icon1} width="45" className="me-3" alt="Logo" />
                                                        <div>
                                                            <a href="/company-details" className=""><h6 className="fw-bold mb-0">Richlabz It</h6></a>
                                                            <div className="text-muted small d-flex align-items-center flex-wrap gap-3">
                                                                <span>
                                                                    <i className="bi bi-geo-alt-fill me-1 text-muted"></i> Hyderabad
                                                                </span>
                                                                <span>
                                                                    <i className="bi bi-people-fill me-1 text-muted"></i> 50–230 people
                                                                </span>
                                                                <span>
                                                                    <i className="bi bi-star-fill me-1 text-warning"></i> 4.5 Ratings
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right: Button */}
                                                    <button
                                                        className="btn btn-primary-2 fw-semibold rounded-pill px-4 py-2"
                                                        style={{ backgroundColor: "#002b5b", border: "none" }}
                                                    >
                                                        Follow
                                                    </button>
                                                </div>

                                                {/* Description */}
                                                <p className="text-muted mb-3">
                                                    Experienced Android Developer skilled in Java, Kotlin, XML, and Firebase, with hands-on
                                                    experience in creating responsive and user-friendly mobile apps.
                                                </p>

                                                {/* Skills + Jobs Section */}
                                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                                                    <div className="skills d-flex flex-wrap gap-2">
                                                        <span className="skill-badge bg-skill-blue">Sketch</span>
                                                        <span className="skill-badge bg-skill-green">UI Design</span>
                                                        <span className="skill-badge bg-skill-yellow">UX Research</span>
                                                        <span className="skill-badge bg-skill-pink">Wireframing</span>
                                                        <span className="skill-badge bg-skill-purple">Prototyping</span>
                                                    </div>
                                                    <p className="mb-0 fw-medium text-info">14 jobs available</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ====== Footer ====== */}
            <Footer />
        </>
    );
};

export default Candidates;
