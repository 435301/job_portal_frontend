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
                            <div className="filter-panel">
                                <h5>Filter</h5>
                                <div className="applied-count">Applied (3)</div>

                                {/* Location */}
                                <div className="mt-3 mb-3">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <select className="form-select" id="location">
                                        <option>Location</option>
                                        <option>New York</option>
                                        <option>Remote</option>
                                        <option>London</option>
                                    </select>
                                </div>

                                {/* Industry */}
                                <div className="mb-3">
                                    <label className="form-label">Industry</label>
                                    {["Software", "Finance", "Management"].map((item, index) => (
                                        <div
                                            key={index}
                                            className="form-check d-flex justify-content-between align-items-center"
                                        >
                                            <div className="d-flex align-items-center">
                                                <input className="form-check-input me-2" type="checkbox" id={item.toLowerCase()} />
                                                <label className="form-check-label" htmlFor={item.toLowerCase()}>{item}</label>
                                            </div>
                                            <span className="number">{index === 0 ? "28" : index === 1 ? "40" : "02"}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Salary Range */}
                                <div className="mb-3 mt-4">
                                    <label className="form-label">Salary Range</label>
                                    <input type="range" className="form-range custom-range" id="salaryRange" />
                                    <div className="range-labels d-flex justify-content-between">
                                        <span>$0</span>
                                        <span>$200K+</span>
                                    </div>
                                </div>

                                {/* Experience Level */}
                                <div className="mb-3">
                                    <label className="form-label">Experience Level</label>
                                    {["Entry Level", "Mid Level", "Senior Level"].map((level, i) => (
                                        <div key={i} className="form-check d-flex align-items-center">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="experience"
                                                id={level.replace(" ", "").toLowerCase()}
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor={level.replace(" ", "").toLowerCase()}
                                            >
                                                {level}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* Job Type */}
                                <div className="mb-3">
                                    <label className="form-label">Job Type</label>
                                    <div className="form-check d-flex align-items-center">
                                        <input className="form-check-input" type="checkbox" id="fulltime" />
                                        <label className="form-check-label ms-2" htmlFor="fulltime">Full Time</label>
                                    </div>
                                    <div className="form-check d-flex align-items-center">
                                        <input className="form-check-input" type="checkbox" id="parttime" />
                                        <label className="form-check-label ms-2" htmlFor="parttime">Part Time</label>
                                    </div>
                                </div>

                                <button className="btn btn-primary w-100">Apply Filters</button>
                            </div>
                        </div>

                        {/* Job List */}
                        <div className="col-lg-9 job-portal">
                            <div className="row g-4 ms-4 mb-3">
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Showing 14–60 of 563 jobs</h6>
                                    <div className="d-flex gap-2">
                                        <select className="form-select">
                                            <option>Show 12</option>
                                            <option>Show 24</option>
                                            <option>Show 48</option>
                                        </select>
                                        <select className="form-select">
                                            <option>Sort by New Post</option>
                                            <option>Sort by Old Post</option>
                                            <option>Sort by Popular</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Job Cards */}
                            <div className=" row g-4 ms-4">
                                {[1, 2, 3, 4].map((job, i) => (
                                  <div key={i} className="col-md-12 wow fadeInUp" data-wow-delay="0.1s">
  <div className="card job-card border-0 h-100 rounded-3">
    <div className="card-body">
      {/* Header Section */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        {/* Left: Profile Info */}
        <div className="d-flex align-items-center">
          <img src={icon1} width="45" className="me-3" alt="Logo" />
          <div>
            <h6 className="fw-bold mb-0">Akeeb Shaik</h6>
            <small className="text-muted">General Proofreader</small>
          </div>
        </div>

        {/* Right: Wishlist + Apply Now Button */}
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-light border p-2"
            style={{ width: "42px", height: "42px" }}
          >
            <i className="bi bi-bookmark fs-5 text-secondary"></i>
          </button>
          <button
            className="btn btn-primary-2 fw-semibold rounded-pill px-4 py-2"
            style={{ backgroundColor: "#002b5b", border: "none" }}
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted mb-3">
        Highly skilled with APA format, Word/PowerPoint, InDesign. Experienced
        Genealogist, Musician, and Rosarian.
      </p>

      {/* Skills + Pay Section */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        {/* Skills */}
        <div className="skills d-flex flex-wrap gap-2">
          <span className="skill-badge bg-skill-blue">Sketch</span>
          <span className="skill-badge bg-skill-green">UI Design</span>
          <span className="skill-badge bg-skill-yellow">UX Research</span>
          <span className="skill-badge bg-skill-pink">Wireframing</span>
          <span className="skill-badge bg-skill-purple">Prototyping</span>
        </div>

        {/* Pay */}
        <p className="mb-0 fw-semibold text-dark">
          <span className="text-info">$150k</span>/day
        </p>
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
