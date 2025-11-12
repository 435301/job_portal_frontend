import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "../assets/css/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Example image imports (update paths accordingly)
import shareIcon from "../assets/img/share.svg";
import favoriteIcon from "../assets/img/favorite-svgrepo-com.svg";
import companyLogo from "../assets/img/job-1.png";

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

            {/* ====== Job Details Section ====== */}
            <div className="container py-5">
                <div className="row g-4">
                    {/* Left Main Content */}
                    <div className="col-lg-8">

                        <div className="job-list-card  shadow-sm rounded">
                            {/* Header Section */}
                            <div
                                className="d-flex p-3 align-items-center border-bottom pb-4 justify-content-between flex-wrap mb-3"
                                style={{
                                    background: "transparent linear-gradient(180deg, #E5F5FA 0%, #FFFFFF 100%) 0% 0% no-repeat padding-box"
                                }}
                            >
                                <div>
                                    <h4 className="fw-semibold mb-1">Sr. Visual Designer</h4>
                                    <p className="mb-2 text-muted">by Grethelin in Design & Creative</p>
                                    <span className="badge bg-success me-2 px-3 py-2">
                                        <i className="bi bi-house-door me-1"></i> Remote
                                    </span>
                                    <span className="badge bg-primary px-3 py-2">
                                        <i className="bi bi-briefcase-fill me-1"></i> Full-time
                                    </span>
                                </div>
                                <div>
                                    <img src={shareIcon} alt="Share" className="me-2 icon-small" />
                                    <img src={favoriteIcon} alt="Favorite" className="icon-small" />
                                </div>
                            </div>

                            {/* Job Role Insights */}
                            <div className="job-insight-card p-3">
                                <h5 className="fw-bold mb-4 mt-4 text-dark">Job role insights</h5>
                                <div className="row">
                                    {[
                                        { icon: "calendar-event", title: "Date posted", value: "July 30, 2025" },
                                        { icon: "calendar-check", title: "Closing date", value: "January 12, 2026" },
                                        { icon: "geo-alt", title: "Hiring Location", value: "New York" },
                                        { icon: "wallet2", title: "Offered salary", value: "$500 – $1,000/month" },
                                        { icon: "briefcase", title: "Career level", value: "Senior" },
                                        { icon: "book", title: "Qualification", value: "Bachelor Degree" },
                                        { icon: "award", title: "Experience", value: "6 – 9 Years" },
                                        { icon: "people", title: "Quantity", value: "5 person" },
                                    ].map((item, index) => (
                                        <div className="col-md-4 mb-3" key={index}>
                                            <div className="job-insight-item d-flex align-items-start">
                                                <div className="job-insight-icon me-3">
                                                    <i className={`bi bi-${item.icon}`}></i>
                                                </div>
                                                <div className="job-insight-text">
                                                    <h6 className="mb-1">{item.title}</h6>
                                                    <p className="text-muted small mb-0">{item.value}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-4 p-3">
                                <h5 className="section-title">Description</h5>
                                <h6>
                                    <b>Overview:</b>
                                </h6>
                                <p>
                                    We are Upper, a global digital organization helping companies engage with customers through mobile
                                    messaging, email, voice, and video.
                                </p>

                                <h5 className="mt-3 mb-4">Requirements:</h5>
                                <ul>
                                    <li>Be heavily involved in turning user stories into high-quality code.</li>
                                    <li>Work as part of an autonomous, cross-functional team delivering top-quality experiences.</li>
                                    <li>Promote and share best practices with your team.</li>
                                    <li>Collaborate closely with passionate, creative professionals.</li>
                                </ul>

                                <h5 className="mt-3 mb-4">Skill & Experience:</h5>
                                <ul>
                                    <li>3+ years of experience as a Product Designer.</li>
                                    <li>Experience using Sketch, InVision, or Framer X.</li>
                                    <li>Experience in Agile environments.</li>
                                    <li>Familiar with Jira and Confluence.</li>
                                </ul>
                            </div>

                            {/* Skills */}
                            <div className="skills  p-3">
                                <h5 className="section-title fw-semibold mb-3">Skills</h5>
                                {["Sketch", "UI Design", "UX Research", "Wireframing", "Prototyping"].map((skill, i) => (
                                    <span
                                        key={i}
                                        className={`skill-badge me-2 mb-2 bg-skill-${["blue", "green", "yellow", "pink", "purple"][i]}`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Maps */}
                            <div className="mb-3 p-3">
                                <h5 className="section-title">Maps</h5>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.970997619414!2d-73.9871555235207!3d40.75889607138707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855df30c00d%3A0x42d542ed2f21c8a1!2sNew%20York%20City!5e0!3m2!1sen!2sus!4v1707311111"
                                    width="100%"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Job Location"
                                ></iframe>
                            </div>
                        </div>
                        {/* Interested Section */}
                        <div className="interest-box mt-4 ">
                            <div className="interest-text">
                                <h5 className="mb-1">Interested in this job?</h5>
                                <p className="text-muted mb-0">67 days left to apply</p>
                            </div>
                            <a href="#" className="btn btn-main">
                                Apply Now
                            </a>
                        </div>

                        {/* Similar Jobs Header */}
                        <div className=" p-3 d-flex justify-content-between align-items-center mb-3 mt-4">
                            <h5 className="section-title mb-0">Similar jobs</h5>
                            <a href="#" className="text-decoration-none fw-semibold">
                                View all jobs
                            </a>
                        </div>

                        {/* Similar Job Cards */}
                        {[
                            { icon: "layers", color: "", title: "Frontend Engineer", company: "Stripe" },
                            { icon: "code-slash", color: "#f0f3ff", title: "UI Developer", company: "Google", iconColor: "#6f42c1" },
                        ].map((job, i) => (
                            <div className="job-card-3 m-3" key={i}>
                                <div className="job-top d-flex justify-content-between align-items-center">
                                    <div className="job-left d-flex align-items-center">
                                        <div
                                            className="logo-box ">
                                            <i className={`bi bi-${job.icon}`}></i>
                                        </div>
                                        <div className="job-info">
                                            <h6 className="mb-0">{job.title}</h6>
                                            <small className="text-muted">{job.company}</small>
                                        </div>
                                    </div>
                                    <button className="wishlist-btn"><i class="bi bi-heart"></i></button>
                                </div>

                                <div className="job-tags ">
                                    <div> <span className="tag-location"><i className="bi bi-geo-alt me-1"></i> San Francisco, CA</span>
                                        <span className="tag-type"><i class="bi bi-briefcase-fill me-1"></i> Full time</span>
                                    </div>
                                    <div class="job-bottom">
                                        <small className="me-3">67 days left to apply</small>
                                        <a href="#" class="btn btn-apply">Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                {/* Right Sidebar */}
                <div className="col-lg-4 mt-4">
                    <div className="sidebar-card-1 mb-4 text-center p-3 rounded">
                        <h4 className="fw-semibold">Interested in this job?</h4>
                        <p className="text-muted small mb-2">67 days left to apply</p>
                        <button className="btn btn-primary mb-2">Apply Now</button>
                    </div>

                    <div className="sidebar-card p-3 rounded shadow-sm">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="me-3">
                                <img src={companyLogo} className="rounded-circle" alt="Company" width={60} height={60} />
                            </div>
                            <button type="button" className="btn btn-outline-secondary btn-sm">
                                <i className="bi bi-plus"></i> Follow
                            </button>
                        </div>
                        <div>
                            <h6 className="mb-0">Product Manager</h6>
                            <small className="text-dark">Google - San Francisco, CA</small>
                        </div>
                        <p className="mt-2 small text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Architecto eos repellendus pariatur.
                        </p>
                        <div className="mb-3">
                            <span className="skill-badge bg-skill-green me-1">React</span>
                            <span className="skill-badge bg-skill-pink me-1">NodeJS</span>
                            <span className="skill-badge bg-skill-purple me-1">Python</span>
                        </div>
                        <div className="text-end">
                            <a href="#" className="text-primary small text-decoration-none">
                                11 jobs available
                            </a>
                        </div>
                    </div>
                </div>
            </div>
      
</div>
            {/* ====== Footer ====== */ }
            < Footer />
        </>
    );
};

export default JobDetails;
