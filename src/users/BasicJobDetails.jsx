import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "../assets/css/style.css";
import CareerBreakPopup from "./components/CareerBreakPopup";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import bgRightHiring from "../assets/img/bg-right-hiring.svg";

const JobDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 🔹 State for tabs
    const [activeTab, setActiveTab] = useState("basic");

    // 🔹 State for job form
    const [jobType, setJobType] = useState("Full time");
    const [openings, setOpenings] = useState(1);

    const jobTypes = [
        { name: "Full time", icon: "bi-briefcase-fill" },
        { name: "Part time", icon: "bi-graph-up" },
        { name: "Work from home", icon: "bi-house-door" },
    ];

    return (
        <>
            {/* ====== Navbar ====== */}
            <div className="container-fluid header position-relative overflow-hidden p-0">
                <Navbar />
                <div className="container-fluid bg-breadcrumb py-5"></div>
            </div>

            {/* ====== Job Details Card ====== */}
            <div className="container my-5 job-crm">
                <div
                    className=" rounded-4 border">
                    {/* 🔹 Tabs Header */}
                    <div className="d-flex rounded justify-content-between align-items-center mb-4 p-4 pb-3" style={{
                        background: "linear-gradient(to bottom, #E5F5FA, #ffffff)",

                    }}>
                        <div className="d-flex gap-4 flex-wrap">
                            <div
                                className={`fw-semibold pb-2 me-4 ${activeTab === "basic"
                                    ? "text-primary border-bottom border-primary"
                                    : ""
                                    }`}
                                role="button"
                                onClick={() => setActiveTab("basic")}
                            >
                                <i className="bi bi-briefcase-fill me-2"></i>Basic Job Details
                            </div>
                            <div
                                className={`fw-semibold pb-2 me-4 ${activeTab === "candidate"
                                    ? "text-primary border-bottom border-primary"
                                    : ""
                                    }`}
                                role="button"
                                onClick={() => setActiveTab("candidate")}
                            >
                                <i className="bi bi-person-badge me-2"></i>Candidate Requirement
                            </div>
                            <div
                                className={`fw-semibold pb-2 me-4 ${activeTab === "timings"
                                    ? "text-primary border-bottom border-primary"
                                    : ""
                                    }`}
                                role="button"
                                onClick={() => setActiveTab("timings")}
                            >
                                <i className="bi bi-clock-history me-2"></i>Timings
                            </div>
                          
                        </div>
                    </div>

                    {/* ====== Tab Content ====== */}
                    <div className="row px-4">
                        {/* ✅ TAB 1 — Basic Job Details */}
                        {activeTab === "basic" && (
                            <div className="animate__animated animate__fadeIn col-lg-6">
                                {/* Job Type */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Job type?</label>
                                    <div className="d-flex gap-3 flex-wrap">
                                        {jobTypes.map((item) => (
                                            <button
                                                key={item.name}
                                                className={`btn ${jobType === item.name
                                                    ? "btn-primary"
                                                    : "btn-outline-secondary"
                                                    } rounded-pill px-4 py-2 d-flex align-items-center gap-2`}
                                                onClick={() => setJobType(item.name)}
                                            >
                                                <i className={`bi ${item.icon}`}></i>
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Job Title */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Job title</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        placeholder="Job Title"
                                    />
                                </div>

                                {/* Job Role / Area of Work */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        Job Role / Area of Work
                                    </label>
                                    <select className="form-select form-control form-control rounded-3">
                                        <option>Select</option>
                                        <option>UI/UX Designer</option>
                                        <option>React Developer</option>
                                        <option>Marketing Executive</option>
                                    </select>
                                </div>

                                {/* Job Location */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Job Location</label>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <select className="form-select form-control form-control rounded-3">
                                                <option>City</option>
                                                <option>San Francisco</option>
                                                <option>New York</option>
                                                <option>Los Angeles</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <select className="form-select form-control form-control rounded-3">
                                                <option>Location Type</option>
                                                <option>Remote</option>
                                                <option>On-site</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* No. of Openings */}
                                <div className="mb-4 row">
                                    <div className="col-lg-6">
                                        <label className="form-label fw-semibold">
                                            No. of Openings
                                        </label>
                                        <input
                                            type="number"
                                            value={openings}
                                            className="form-control rounded-3"

                                            readOnly
                                        />
                                    </div>
                                    <div className="col-lg-6 can-list">
                                        <div className="d-flex align-items-center gap-2 mt-4 pt-2">

                                            <button
                                                className="btn btn-light rounded-circle"
                                                onClick={() => setOpenings((prev) => Math.max(prev - 1, 1))}
                                            >
                                                −
                                            </button>
                                            <button
                                                className="btn btn-light rounded-circle"
                                                onClick={() => setOpenings((prev) => prev + 1)}
                                            >
                                                +
                                            </button>
                                        </div></div>
                                </div>
                            </div>
                        )}

                        {/* ✅ TAB 2 — Candidate Requirement */}
                        {activeTab === "candidate" && (
                            <div className="animate__animated animate__fadeIn row req">
                                <h5 className="fw-semibold mb-3">Candidate Requirement</h5>

                                {/* Employment Type */}
                                <div className="mb-3 col-lg-8">
                                    <label className="form-label fw-semibold">Total Experience of Candidate</label>
                                    {/* <div className="d-flex flex-wrap gap-2">
                                        <button className="btn btn-outline-primary btn-sm rounded-pill">
                                            <i className="bi bi-briefcase"></i> Full time
                                        </button>
                                        <button className="btn btn-outline-primary btn-sm rounded-pill">
                                            <i className="bi bi-clock-history"></i> Part time
                                        </button>
                                        <button className="btn btn-outline-primary btn-sm rounded-pill">
                                            <i className="bi bi-lightning"></i> Experienced
                                        </button>
                                    </div> */}
                                </div>

                                {/* Experience */}
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Minimum Experience</label>
                                        <select className="form-select form-control rounded-3">
                                            <option>Select</option>
                                            <option>0 years</option>
                                            <option>1 year</option>
                                            <option>2+ years</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold">Maximum Experience</label>
                                        <select className="form-select form-control rounded-3">
                                            <option>Select</option>
                                            <option>3 years</option>
                                            <option>5 years</option>
                                            <option>10+ years</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Qualification */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Minimum Qualification</label>
                                    <div className="d-flex flex-wrap gap-2">
                                        {["<10th Pass", "10th Pass or Above", "12th Pass or Above", "Graduate / Post Graduate"].map((q, i) => (
                                            <button key={i} className="btn btn-outline-secondary btn-sm rounded-pill">
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* Gender Preference */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Gender Preference</label>
                                    <div className="d-flex flex-wrap gap-2">
                                        <button className="btn btn-outline-dark btn-sm rounded-pill">
                                            Both
                                        </button>
                                        <button className="btn btn-outline-dark btn-sm rounded-pill">
                                            <i className="bi bi-gender-male"></i> Male
                                        </button>
                                        <button className="btn btn-outline-dark btn-sm rounded-pill">
                                            <i className="bi bi-gender-female"></i> Female
                                        </button>
                                    </div>
                                </div>

                                {/* How soon to fill position */}
                                <div className="col-12 mb-3 req">
                                    <label className="form-label fw-semibold">How soon do you want to fill the position?</label>
                                    <div className="d-flex flex-wrap gap-2">
                                        <button type="button" className="btn btn-outline-secondary ">Immediately (1-2 weeks)</button>
                                        <button type="button" className="btn btn-outline-secondary ">Immediate</button>
                                        <button type="button" className="btn btn-outline-secondary ">Immediately in 30 days</button>
                                    </div>
                                </div>

                                {/* Relocation Option */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Would you like to receive candidates’ applications from nearby cities if they are willing to relocate?
                                    </label>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="relocateSwitch" />
                                        <label className="form-check-label" htmlFor="relocateSwitch">
                                            Yes
                                        </label>
                                    </div>
                                </div>

                                {/* Salary Range */}
                                <div className="row mb-3 align-items-center">
                                    <label className="form-label fw-semibold">Monthly In-hand Salary(USD)</label>
                                    <div className="col-md-4">
                                        <input type="number" className="form-control rounded-3" placeholder="16000" />
                                    </div>
                                    <div className="col-md-1 m-0">to</div>
                                    <div className="col-md-4 m-0 p-0">
                                        <input type="number" className="form-control rounded-3" placeholder="20000" />
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="mb-3 row">
                                    <div className="col-lg-"> <label className="form-label fw-semibold">Skills</label>
                                        <textarea
                                            className="form-control rounded-3 mb-2"
                                            placeholder="Enter Skills"
                                            style={{ height: "120px" }}
                                        />
                                        <div className="d-flex flex-wrap gap-2 mt-4">
                                            {["+Next.js", "+Redux", "+Webpack", "+Ember.js", "+Node"].map((skill, i) => (
                                                <span key={i} className="badge bg-light text-dark border rounded-pill px-3 py-2">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div></div>
                                </div>
                            </div>
                        )}


                        {/* ✅ TAB 3 — Timings */}
                        {activeTab === "timings" && (
                            <div className="animate__animated animate__fadeIn row">
                                <h5 className="fw-semibold mb-3">Job Timings</h5>
                                <div className="mb-5 col-lg-5">
                                    <label className="form-label">Working Hours</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        placeholder="e.g., 9:00 AM - 6:00 PM"
                                    />
                                </div>
                                <p>Please mention job timings correctly otherwise candidates may not join.</p>
                            </div>
                        )}

                    </div>

                    {/* ===== Footer Buttons ===== */}
                    <div className="d-flex justify-content-end my-4 pb-4 me-3">
                        <button className="btn link rounded-pill px-4 me-3">
                            Back
                        </button>
                        <a href="/job-posting" className="btn btn-dark rounded-pill px-4">
                            Next <i className="bi bi-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* ====== Footer ====== */}
            <Footer />
        </>
    );
};

export default JobDetails;
