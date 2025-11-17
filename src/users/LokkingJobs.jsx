import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import careerImg from "../assets/img/banner-home-0.png";   // ← ADD IMAGE
import hireImg from "../assets/img/banner-home-02.png";       // ← ADD IMAGE

const SuccessPage = () => {
    return (
        <>
            {/* HEADER */}
            <Navbar />

            {/* PAGE WRAPPER */}
            <div className="success-wrapper d-flex justify-content-center align-items-center">

               <Container className="my-5">
                <div className="row g-4 justify-content-center mt-5">

                    {/* Left Card */}
                    <div className="col-md-4">
                        <div className="p-4 rounded-4 shadow-sm text-center bg-white py-5 ">
                            <img src={careerImg} alt="Career" width="180" className="mb-3" />

                            <h5 className="fw-bold mb-2">
                                Looking to Grow Your <span className="text-primary">Career?</span>
                            </h5>

                            <button
                                className="btn btn-outline-primary rounded-pill px-4 py-2 mt-3"
                            >
                                Find jobs
                            </button>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="col-md-4">
                        <div className="p-4 rounded-4 shadow-sm text-center bg-white py-5">
                            <img src={hireImg} alt="Hire" width="180" className="mb-3" />

                            <h5 className="fw-bold mb-2">
                                Looking to <span className="text-danger">Hire</span> Talent?
                            </h5>

                            <button
                                className="btn btn-outline-danger rounded-pill px-4 py-2 mt-3"
                            >
                                Post a job
                            </button>
                        </div>
                    </div>

                </div>
            </Container>
        
            </div>

            {/* NEW CARD SECTION */}
           

            {/* FOOTER */}
            <Footer />
        </>
    );
};

export default SuccessPage;
