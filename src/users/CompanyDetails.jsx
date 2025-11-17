import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "../assets/css/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// React Slick (carousel replacement for OwlCarousel)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Example image imports (update paths accordingly)
import shareIcon from "../assets/img/share.svg";
import favoriteIcon from "../assets/img/favorite-svgrepo-com.svg";
import companyLogo from "../assets/img/download.png";

const JobDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
    }, []);
    const sliderSettings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
    };

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

                        <div className="job-list-card  rounded">
                            {/* Header Section */}
                            <div className="border-bottom" style={{
                                background: "transparent linear-gradient(180deg, #E5F5FA 0%, #FFFFFF 100%) 0% 0% no-repeat padding-box"
                            }}>
                                <div
                                    className="d-flex p-3 align-items-center   justify-content-between flex-wrap"

                                >
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={companyLogo}
                                                alt="Company Logo"
                                                width="70"
                                                height="70"
                                                className="rounded me-3"
                                            />
                                            <div>
                                                <h4 className="fw-bold mb-1">Richlabz It</h4>
                                                <p className="text-muted small mb-1">
                                                    <i className="bi bi-geo-alt me-1"></i> London, UK •
                                                    50–100 Employees
                                                </p>
                                                <div className="text-warning small mb-2">
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-half"></i>
                                                    <span className="text-muted ms-2">
                                                        (4.3 / 256 reviews)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div>
                                        <img src={shareIcon} alt="Share" className="me-2 icon-small" />
                                        <img src={favoriteIcon} alt="Favorite" className="icon-small" />
                                    </div>

                                </div>
                                <div className="mb-3 mt-md-0 px-3">
                                    <button className="btn btn-dark me-2">
                                        <i className="bi bi-plus"></i> Follow
                                    </button>
                                    <button className="btn btn-outline-secondary me-2">
                                        <i className="bi bi-globe"></i> Website
                                    </button>
                                    <button className="btn btn-outline-secondary">
                                        <i className="bi bi-share"></i> Share
                                    </button>
                                </div>
                            </div>


                            {/* Description */}
                            <div className="mb-2 p-3 ">
                                <h5 className="section-title">Overview:</h5>

                                <p>
                                    Pulley’s mission is to make it easier for anyone to start a company. We believe that more startups should exist and that founder-led companies are more successful in the long term. With Pulley’s cap table management tools, companies can better understand and optimize their equity for the long term. Starting a company is hard enough. Managing equity shouldn’t be.
                                </p>
                                <p>We’re a high-performing team looking for passionate, execution-focused, self-starters to help us build equity management tools for founders. Pulley is growing quickly with over 1600 customers including unicorns like Clubhouse, Birdies, Coda, and Fast – all within our first year of product launch. Our trajectory is fueled by top investors like Richlabz It, General Catalyst, Caffeinated Capital, 8vc, Elad Gil, among other great angels.</p>

                            </div>
                            {/* <div className="mb-4 p-3">
                                <h5>Photos</h5>
                                <div className="mt-3">
                                    <Slider {...sliderSettings}>
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div className="item" key={i}>
                                                <div
                                                    className="photo-box rounded overflow-hidden mx-2"
                                                    style={{ height: "150px" }}
                                                >
                                                    <img
                                                        src={`https://picsum.photos/400/250?random=${i}`}
                                                        alt={`Office ${i}`}
                                                        className="img-fluid w-100 h-100"
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div> */}
                            {/* Maps */}

                        </div>



                        {/* Jobs at Skype Section */}
                        <div className="border mt-4 mb-4 rounded">
                            <h5 className="fw-bold bg-light p-3 mb-3">Jobs at Richlabz It</h5>

                            {[
                                {
                                    title: "Frontend Engineer",
                                    company: "Richlabz It",
                                    rating: "4.2",
                                    reviews: "256",
                                    location: "San Francisco, CA",
                                    experience: "8–10 years",
                                    salary: "$ Not disclosed",
                                },
                                {
                                    title: "Backend Engineer",
                                    company: "Richlabz It",
                                    rating: "4.2",
                                    reviews: "256",
                                    location: "San Francisco, CA",
                                    experience: "8–10 years",
                                    salary: "$ Not disclosed",
                                },
                                {
                                    title: "Backend Engineer",
                                    company: "Richlabz It",
                                    rating: "4.2",
                                    reviews: "256",
                                    location: "San Francisco, CA",
                                    experience: "8–10 years",
                                    salary: "$ Not disclosed",
                                },
                            ].map((job, i) => (
                                <div key={i} className="mb-4 pb-3 border-bottom">
                                    <div className="job-card-list  d-flex justify-content-between align-items-start p-3 rounded">
                                        {/* Left Section */}
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={companyLogo}
                                                alt={`${job.company} logo`}
                                                width="60"
                                                height="60"
                                                className="rounded me-3"
                                            />
                                            <div>
                                                <h5 className="fw-semibold mb-1">{job.title}</h5>
                                                <div className="d-flex align-items-center small text-muted mb-2">
                                                    <span className="me-2">{job.company}</span>
                                                    <span className="text-warning me-1">
                                                        <i className="bi bi-star-fill"></i>
                                                    </span>
                                                    {job.rating} ({job.reviews} reviews)
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Section */}
                                        <button className="btn btn-link text-decoration-none fw-semibold text-dark">
                                            <i className="bi bi-bookmark-fill me-2"></i>Save
                                        </button>
                                    </div>

                                    {/* Job Info Badges */}
                                    <div className="job-tags px-3 mb-3">
                                        <div> <span className="tag-location"><i className="bi bi-geo-alt me-1"></i> San Francisco, CA</span>
                                            <span className="tag-type"><i class="bi bi-briefcase-fill me-1"></i> 8-10 years</span>
                                            <span className="skill-badge bg-skill-purple me-1">$ Not disclosed</span>

                                        </div>

                                    </div>
                                    {/* Job Description */}
                                    <p className="small text-muted mb-0 ps-3">
                                        Experienced Python Developer with strong hands-on experience in Python coding, SQL, and data handling.
                                    </p>
                                </div>
                            ))}
                        </div>


                    </div>


                    {/* Right Sidebar */}
                    <div className="col-lg-4 mt-4">
                        <div className="info-card mb-4 bg-white rounded border">
                            <h5 className="fw-bold text-dark my-3 px-3">Information</h5>
                            <hr className="mt-0 mb-3" />

                            <ul className="list-unstyled mb-0 info-list reac px-3">
                                <li className="d-flex justify-content-between align-items-start mb-3">
                                    <strong>Categories</strong>
                                    <span className="text-primary">B2B SaaS&nbsp;&nbsp;Software</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-start mb-3">
                                    <strong>Company size</strong>
                                    <span className="text-primary">50–100 Employees</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-start mb-3">
                                    <strong>Founded in</strong>
                                    <span className="text-primary">English</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-start mb-3">
                                    <strong>Location</strong>
                                    <span className="text-primary">London, UK</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-start mb-3">
                                    <strong>Phone</strong>
                                    <span className="text-primary">****</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-start">
                                    <strong>Email</strong>
                                    <span className="text-primary">****</span>
                                </li>
                            </ul>
                        </div>


                        <div className="sidebar-card p-3 rounded ">
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
            {/* ====== Footer ====== */}
            < Footer />
        </>
    );
};

export default JobDetails;
