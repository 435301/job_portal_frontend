import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const SuccessPage = () => {
    return (
        <>
            {/* HEADER */}
            <Navbar />

            {/* PAGE WRAPPER */}
            <div className="success-wrapper d-flex justify-content-center align-items-center">

                {/* Success Card */}
                <div className="mt-4">  <div className="success-card text-center shadow rounded-4 p-5 mt-5">

                    {/* Green Check Icon */}
                    <div className="success-icon mx-auto mb-4">
                        <span className="checkmark">✔</span>
                    </div>

                    {/* Title */}
                    <h3 className="fw-bold mb-2">Congratulations</h3>

                    {/* Description */}
                    <p className="text-muted">
                        Your account is successfully activated.
                        <br />
                        Explore our hiring plans designed to support
                        <br />
                        your recruitment needs.
                    </p>
                </div></div>

            </div>

            {/* FOOTER */}
            <Footer />
        </>
    );
};

export default SuccessPage;
