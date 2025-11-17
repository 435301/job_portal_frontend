import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "../assets/css/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Import images
import img2 from "../assets/img/img-2.png";
import shareIcon from "../assets/img/share.svg";
import favoriteIcon from "../assets/img/favorite-svgrepo-com.svg";
import icon1 from "../assets/img/icon-1.png";

const CandidatesDetails = () => {
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
                            className="search-bar ms-5 ps-4 bg-white  d-flex align-items-center justify-content-between px-3 py-2 flex-wrap"
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
            <div className="container py-5">
                <div className="row g-4">
                    {/* Left Main Content */}
                    <div className="col-lg-8">
                        <img src={img2} alt="Job Banner" className="w-100 rounded" />

                        {/* Job Info Section */}
                        <div className="job-list-card p-4 bg-white rounded-3">
                            {/* TOP SECTION */}
                            <div className="d-flex align-items-start justify-content-between flex-wrap mb-4">

                                {/* LEFT SIDE: NAME + DETAILS */}
                                <div>
                                    <h4 className="fw-semibold mb-1">Akeeb Shaik</h4>

                                    <div className="text-muted d-flex align-items-center flex-wrap">
                                        <span className="text-info fw-semibold me-2">UI/UX Designer</span>

                                        <span className="mx-2">•</span>

                                        <i className="bi bi-geo-alt me-1"></i>
                                        <span className="me-3">Boston</span>

                                        <span className="mx-2">•</span>

                                        <span className="fw-semibold">$40/day</span>
                                    </div>
                                </div>

                                {/* RIGHT SIDE: SHARE + WISHLIST */}
                                <div className="mt-3 mt-md-0">
                                    <img src={shareIcon} alt="Share" className="me-3" width="22" />
                                    <img src={favoriteIcon} alt="Favorite" width="22" />
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className="d-flex flex-wrap gap-3 mb-4">
                                <button className="btn btn-outline-info fw-medium px-4 rounded-pill">
                                    + Follow
                                </button>

                                <button className="btn btn-outline-secondary px-4 rounded-pill">
                                    Save to PDF
                                </button>

                                <button className="btn btn-outline-secondary px-4 rounded-pill">
                                    Message
                                </button>
                            </div>

                            {/* ABOUT SECTION */}
                            <h5>About me</h5>
                            <p>
                                With my experience for more than 3 years in Customer Service, I can really
                                say that I am good in communicating with clients and understanding their
                                needs to save time and ensure a smooth transaction.
                            </p>
                            <p>
                                I love talking to people and having casual conversations. Social media helps
                                me stay updated on trends, social events, and news.
                            </p>
                            <p>
                                I have the experience to contribute success in your business. I’m looking
                                forward and excited to partner with you! Thank you for checking my profile.
                                Have a great day!
                            </p>
                        </div>


                        {/* Skills */}
                        <div className="job-list-card mt-4 p-3 bg-white  rounded">
                            <div className="skills">
                                <h5 className="fw-semibold mb-3">Skills</h5>
                                <span className="skill-badge bg-skill-blue">Sketch</span>
                                <span className="skill-badge bg-skill-green">UI Design</span>
                                <span className="skill-badge bg-skill-yellow">UX Research</span>
                                <span className="skill-badge bg-skill-pink">Wireframing</span>
                                <span className="skill-badge bg-skill-purple">Prototyping</span>
                            </div>
                        </div>

                        {/* Work Experience */}
                        <div className="timeline-card mt-4">
                            <h5 className="timeline-title mb-3">Work Experience</h5>
                            <ul className="timeline-list list-unstyled">
                                <li className="timeline-item">
                                    <h6>Web Designer</h6>
                                    <a href="#" className="company">Alpabe Corporation</a>
                                    <span className="meta"><i class="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31</span>
                                    <p>Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium
                                        et, accumsan ac est. Integer vehicula rhoncus molestie.</p>
                                </li>

                                <li className="timeline-item">
                                    <h6>Web Designer</h6>
                                    <a href="#" className="company">Alpabe Corporation</a>
                                    <span className="meta"><i class="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31</span>
                                    <p>Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium
                                        et, accumsan ac est. Integer vehicula rhoncus molestie.</p>
                                </li>
                                <li className="timeline-item">
                                    <h6>Web Designer</h6>
                                    <a href="#" className="company">Alpabe Corporation</a>
                                    <span className="meta"><i class="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31</span>
                                    <p>Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium
                                        et, accumsan ac est. Integer vehicula rhoncus molestie.</p>
                                </li>
                            </ul>
                        </div>

                        {/* Education */}
                        <div className="timeline-card mt-4">
                            <h5 className="timeline-title mb-3">Education</h5>
                            <ul className="timeline-list list-unstyled">
                                <li class="timeline-item">
                                    <h6>New York University</h6>
                                    <span className="degree">Master’s</span>
                                    <span className="meta"><i className="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31</span>
                                    <p>Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium
                                        et, accumsan ac est. Integer vehicula rhoncus molestie.</p>
                                </li>

                                <li className="timeline-item">
                                    <h6>Donetsk National School</h6>
                                    <span className="degree">Uxper Studio</span>
                                    <span className="meta ">
                                        <i className="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31
                                    </span>
                                    <p>Mauris nec erat ut libero vulputate pulvinar. Integer vehicula rhoncus molestie.</p>
                                </li>

                                <li className="timeline-item">
                                    <h6>Oxford School</h6>
                                    <span href="#" className="degree">Envato Ltd</span>
                                    <span className="meta">
                                        <i className="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31
                                    </span>
                                    <p>Mauris nec erat ut libero vulputate pulvinar. Integer vehicula rhoncus molestie.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-lg-4">
                        <div class="card mb-3">
                            <div class="card__header">Information</div>

                            <ul class="card__list">
                                <li><span class="card__label">Offered Salary:</span> <span class="card__value">$40/day</span></li>
                                <li><span class="card__label">Experience time:</span> <span class="card__value">1 - 2 Years</span></li>
                                <li><span class="card__label">Languages:</span> <span class="card__value">English</span></li>
                                <li><span class="card__label">Gender:</span> <span class="card__value">Female</span></li>
                                <li><span class="card__label">Qualification:</span> <span class="card__value">Associate Degree</span></li>
                                <li><span class="card__label">Age:</span> <span class="card__value">****</span></li>
                                <li><span class="card__label">Phone:</span> <span class="card__value">****</span></li>
                                <li><span class="card__label">Email:</span> <span class="card__value">joseph123@gmail.com</span></li>
                            </ul>
                        </div>


                        <div className="info-card p-4 bg-white  rounded">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="fw-semibold text-dark mb-0">Maps</h6>
                                <a href="#" className="text-primary small text-decoration-none">Get Direction</a>
                            </div>
                            <div className="map-box">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091447!2d144.95373631550457!3d-37.8162797420146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f9df2f0b%3A0x5045675218ceed30!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1632238474636!5m2!1sen!2sus"
                                    width="100%"
                                    height="180"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Job Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ====== Footer ====== */}
            <Footer />
        </>
    );
};

export default CandidatesDetails;
